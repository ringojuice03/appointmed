from django.urls import path
from . import views

urlpatterns = [
    path('', views.say_hello, name='say hello'),

    path('logout/', views.LogIn, name='logout'),
    path('login/', views.LogIn, name='login'),
    path("signup/", views.signup, name="signup"),

    # path('patient/home/', views.PatientHomeView.as_view(), name="patient home"),
    path("patient/home/", views.PatientHome, name="patient home"),
    path("patient/appointments/", views.PatientAppointmentView.as_view(), name="patient appointments"),
    path('patient/about/', views.patient_about, name="patient about"),
    path('patient/profile/', views.patient_profile, name="patient profile"),

    path('doctor/home/', views.doctor_home, name="doctor home"),

    path('doctor/home/calendar/api', views.doctor_appointment_json_api, name="doctor appointment api"),
    path("doctor/home/calendar/reschedule/api", views.doctor_reschedule_api, name="doctor reschedule api"),
    path('process-appoinment', views.process_appointment, name="process appointment"),
]
