from django.contrib.auth import authenticate, login
from django.shortcuts import render, get_object_or_404, redirect
from django.views import generic
from django.urls import reverse
from django.http import HttpResponseRedirect
from django.contrib import messages

from .forms import SignUpForm
from .models import Patient, Doctor, Appointment

def say_hello(request):
    return render(request, 'hello.html')

def LogIn(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = authenticate(request, username=email, password=password)

        if user is not None:
            login(request, user)
            user_type = request.POST.get('user_type')
            if user_type == 'patient' and Patient.objects.filter(user=user).exists():
                return redirect('patient home')
            elif user_type == 'doctor' and Doctor.objects.filter(user=user).exists():
                return redirect('doctor home')
            else:
                messages.error(request, f'This user is not registered as a {user_type}')
        else:
            messages.error(request, 'Invalid username or password')
            return redirect('login')
        
    return render(request, 'login.html')


def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('login'))
    else:
        form = SignUpForm()

    return render(request, 'signup.html', {'form': form})


def PatientHome(request):
    patient = get_object_or_404(Patient, user=request.user)
    return render(request, 'patient_home.html', {'patient': patient})


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



def doctor_home(request):
    return render(request, 'doctor_view.html')