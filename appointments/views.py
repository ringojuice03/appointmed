from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import AnonymousUser

from django.shortcuts import render, get_object_or_404, redirect
from django.views import generic
from django.urls import reverse
from django.http import HttpResponseRedirect
from django.contrib import messages
from django.http import JsonResponse
from django.utils.timezone import make_aware, now, get_current_timezone, localtime
from datetime import timedelta, datetime as dt
import datetime
import json

from .forms import UserForm, PatientForm, DoctorForm
from .models import Patient, Doctor, Appointment, Notification


def say_hello(request):
    return render(request, 'hello.html')

def LogOut(request):
    logout(request)
    return redirect('login')

def LogIn(request):
    if request.method == 'POST':
        identifier = request.POST.get('identifier')
        password = request.POST.get('password')
        user_type = request.POST.get('user_type')

        user = authenticate(request, username=identifier, password=password)

        if user is not None:
            if user_type == 'patient' and Patient.objects.filter(user=user).exists():
                login(request, user)
                return redirect('patient home')
            elif user_type == 'doctor' and Doctor.objects.filter(user=user).exists():
                login(request, user)
                return redirect('doctor home')
            else:
                messages.error(request, f'This user is not registered as a {user_type}')
        else:
            messages.error(request, 'Invalid username or password')
            return redirect('login')
        
    return render(request, 'login.html')


def signup(request): 
    if request.method == 'POST':
        user_form = UserForm(request.POST)
        is_doctor = (request.POST.get('role') == 'doctor')

        if is_doctor:
            profile_form = DoctorForm(request.POST, request.FILES)
        else:
            profile_form = PatientForm(request.POST)

        if user_form.is_valid() and profile_form.is_valid():
            user = user_form.save(commit=False)
            user.set_password(user_form.cleaned_data['password1'])
            user.save()

            profile = profile_form.save(commit=False)
            profile.user = user
            profile.save()

            return redirect('login')
            
        else:
            dictionary = {'user_form': user_form, 'profile_form': profile_form}
            return render(request, 'signup.html', dictionary)
    else:
        user_form = UserForm()
        profile_form = PatientForm()
    
    dictionary = {'user_form': user_form, 'profile_form': profile_form}
    return render(request, 'signup.html', dictionary)


def PatientHome(request):
    if isinstance(request.user, AnonymousUser):
        return redirect('login')

    patient = get_object_or_404(Patient, user=request.user)
    doctors = Doctor.objects.all()

    specializations = doctors.values_list('specialty' ,flat=True).distinct()

    return render(request, 'patient_home.html', {
        'patient': patient, 
        'doctors': doctors,
        'specializations': specializations,
    })

def PatientHome_DoctorDetails(request):
    patient = get_object_or_404(Patient, user=request.user)
    return render(request, 'patient_home_doctor_details.html', {'patient': patient})


# class PatientHomeView(generic.ListView):
#     template_name = 'patient_home.html'
#     context_object_name = 'doctor_list'

#     def get_queryset(self):
#         return Doctor.objects.all()
    
    
def patient_home(request):
    return render(request, 'patient_home.html')

# nonfunctional yet, need user login to get current user instance
class PatientAppointmentView(generic.ListView):
    template_name = 'patient_appointments.html'
    context_object_name = 'patient_appointment_list'

    def get_queryset(self):
        patient = get_object_or_404(Patient, user=self.request.user)
        return patient.appointment_set.all()

def patient_about(request):
    return render(request, 'patient_about.html')

def patient_profile(request):
    return render(request, 'patient_profile.html')

def patient_reschedule_api(request):
    if request.method == "POST":
        action = request.POST.get('action')
        notification_id = request.POST.get('notification_id')

        notification = Notification.objects.get(id=notification_id)
        appointment = Appointment.objects.get(id=notification.appointment.id)

        if action == 'accept':
            appointment = 'scheduled'
            notification.notification_type = 'reschedule_accepted'
            
        elif action == 'reject':
            appointment = 'rejected'
            notification.notification_type = 'reschedule_rejected'

        appointment.save()
        notification.save()

    return render(request, 'patient home')



def doctor_home(request):
    if isinstance(request.user, AnonymousUser):
        return redirect('login')

    doctor = get_object_or_404(Doctor, user=request.user)
    appointments = Appointment.objects.filter(doctor=doctor)

    
    for apt in appointments:
        if apt.appointment_date >= now(): continue

        # pending appointments in the past are treated as rejected appointments
        if apt.status == 'pending':
            apt.status = 'rejected'
            apt.save()
            Notification.objects.create(
                appointment = apt,
                notification_type = 'rejected',
            )
        # scheduled appt. completes when the appointment date is in the past
        elif apt.status == 'scheduled':
            apt.status = 'completed'
            apt.save()

    pending_appointments = Appointment.objects.filter(doctor=doctor, status='pending').order_by('appointment_date')
    notifications = Notification.objects.filter(appointment__doctor=doctor).order_by('-appointment__appointment_date')

    calendar_view = request.session.get('calendar_view', 'Week')
    request.session['calendar_view'] = ''

    return render(request, 'doctor_home.html', {
            'doctor': doctor, 
            'appointments': pending_appointments, 
            'notifications': notifications,
            'current_view': calendar_view,
    })


@login_required
def doctor_appointment_json_api(request):
    doctor = get_object_or_404(Doctor, user=request.user)
    appointments = Appointment.objects.filter(doctor=doctor).order_by('appointment_date')

    events = []
    for appointment in appointments:
        if appointment.status == 'rejected': 
            continue

        local_start = localtime(appointment.appointment_date).replace(tzinfo=None)
        local_end = (local_start + timedelta(minutes=30)).replace(tzinfo=None)

        events.append({
            "id": appointment.id,
            "text": f'{appointment.patient.user.first_name} {appointment.patient.user.last_name}',
            "start": local_start.isoformat(),
            "end": local_end.isoformat(),
            "status": appointment.status,
        })
    
    return JsonResponse(events, safe=False)

@csrf_exempt
@login_required
def doctor_reschedule_api(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            apt_id = data.get('id')
            new_start = data.get('newStart')
            
            # dt is origin: from datetime import timedelta, datetime as dt
            resched_datetime = dt.strptime(new_start, '%Y-%m-%dT%H:%M:%S')
            resched_datetime = make_aware(resched_datetime)

            appointment = Appointment.objects.get(id=apt_id)

            if resched_datetime < now():
                return JsonResponse({"success": False, "error": "You cannot reschedule an appointment to the past.", })
            
            if Appointment.objects.filter(appointment_date=new_start).exists():
                return JsonResponse({"success": False, "error": "Only one appointment per slot is allowed."})

            if Notification.objects.filter(appointment=appointment).exists():
                notification = Notification.objects.get(appointment=appointment)
                appointment.appointment_date = resched_datetime
                appointment.save()
                notification.appointment = appointment
                notification.save()
            else:
                appointment.appointment_date = resched_datetime
                appointment.save()
                Notification.objects.create(
                    appointment = appointment,
                    notification_type = 'rescheduled',
                )

            return JsonResponse({"success": True, "minjitime": (resched_datetime).isoformat()})

        except Appointment.DoesNotExist:
            return JsonResponse({"success": False, "error": "Appointment does not exist in database"})
        except Exception as e:
            return JsonResponse({"success": False, "error": str(e)})

    return JsonResponse({"success": False, "error": "Request is not POST."})


def process_appointment(request):
    if request.method == "POST":
        appointment_id = request.POST.get('appointment-id')
        action = request.POST.get('action')
        
        calendar_view = request.POST.get('current-view')
        request.session['calendar_view'] = calendar_view
        
        try:
            apt = Appointment.objects.get(id=appointment_id)

            if action == 'accept':
                action = 'accepted'
                apt.status = 'scheduled'
            elif action == 'reject':
                action = 'rejected'
                apt.status = 'rejected'

            apt.save()

            Notification.objects.create(
                appointment = apt,
                notification_type = action
            )

            return redirect('doctor home')

        except Appointment.DoesNotExist:
            return redirect('doctor home')

    return redirect('doctor home')