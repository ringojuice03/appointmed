from django.db import models
from django.contrib.auth.models import User

class Doctor(models.Model):
    doctor_name = models.CharField(max_length=200, default="Dr. Placeholder")
    specialization = models.CharField(max_length=100)
    # user = models.OneToOneField(User, on_delete=models.CASCADE)
    # others like address, clinic(if any)
    def __str__(self):
        return self.doctor_name

class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    patient_name = models.CharField(max_length=200, default="Patient placeholder")
    date_of_birth = models.DateField()
    # user = models.OneToOneField(User, on_delete=models.CASCADE)
    # illness description, etc.
    def __str__(self):
        return self.patient_name
    

class Appointment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    appointment_date = models.DateTimeField()
    status = models.CharField(max_length=20, choices=[('scheduled', 'Scheduled'), ('completed', 'Completed'), ('canceled', 'Canceled')])
    
    def __str__(self):
        return self.patient.patient_name + " & " + self.doctor.doctor_name
    