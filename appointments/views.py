from django.shortcuts import render
from django.http import HttpResponse

def say_hello(request):
    return render(request, 'hello.html')

def patient_home1(request):
    return render(request, 'patient_home1.html')

def patient_home2(request):
    return render(request, 'patient_home2.html')

def doctor_home(request):
    return render(request, 'doctor_view.html')