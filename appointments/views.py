from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import AnonymousUser
from django.shortcuts import render, get_object_or_404, redirect
from django.views import generic
from django.urls import reverse
from django.http import HttpResponseRedirect
from django.contrib import messages
import re

from .forms import UserForm, PatientForm, DoctorForm
from .models import Patient, Doctor, Appointment

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
    if isinstance(request.user, AnonymousUser):
        return redirect('login')

    doctor = get_object_or_404(Doctor, user=request.user)
    return render(request, 'doctor_home.html', {'doctor': doctor})