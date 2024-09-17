from django.urls import path
from . import views

urlpatterns = [
    path('', views.say_hello),
    path('patient/', views.patient_home),
    path('doctor/', views.doctor_home),
]
