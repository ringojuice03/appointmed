from django.urls import path
from . import views

urlpatterns = [
    path('', views.say_hello),
    path('patient1/', views.patient_home1),
    path('patient2/', views.patient_home2),
    path('doctor/', views.doctor_home),
]
