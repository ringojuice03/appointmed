from django.contrib.auth import login, authenticate
from django.shortcuts import render, get_object_or_404, redirect
from django.views import generic
from django.urls import reverse
from django.http import HttpResponseRedirect
from django.contrib import messages

from .forms import SignUpForm
from .models import Patient, Doctor, Appointment

def say_hello(request):
    return render(request, 'hello.html')

def signin(request):
    return render(request, 'user_signin.html')


def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return HttpResponseRedirect(reverse('signup'))
    else:
        form = SignUpForm()

    return render(request, 'signup.html', {'form': form})


def PatientHome(request):
    patient = get_object_or_404(Patient, user=request.user)
    return render(request, 'patient_home.html', {'patient': patient})


def User_auth(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = authenticate(request, username=email, password=password)

        if user is not None:
            login(request, user)
            return redirect('patient home')
        else:
            messages.error(request, 'Invalid username or password')
            return redirect('signin')
        
    return render(request, 'user_signin.html')


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