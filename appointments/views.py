from django.shortcuts import render

def say_hello(request):
    return render(request, 'hello.html')

def patient_home(request):
    return render(request, 'patient_home.html')

def patient_appointments(request):
    return render(request, 'patient_appointments.html')

def patient_about(request):
    return render(request, 'patient_about.html')

def patient_profile(request):
    return render(request, 'patient_profile.html')

def doctor_home(request):
    return render(request, 'doctor_view.html')