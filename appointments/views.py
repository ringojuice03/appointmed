from django.shortcuts import render
from django.http import HttpResponse

def say_hello(request):
    return render(request, 'hello.html')

def patient_home(request):
    return render(request, 'patient_home.html')

def doctor_home(request):
    return render(request, 'doctor_home.html')