from django.shortcuts import render, get_object_or_404
from django.views import generic

from .models import Patient, Doctor, Appointment

def say_hello(request):
    return render(request, 'hello.html')


class PatientHomeView(generic.ListView):
    template_name = 'patient_home.html'
    context_object_name = 'doctor_list'

    def get_queryset(self):
        return Doctor.objects.all()
    
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