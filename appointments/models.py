from django.db import models
from django.contrib.auth.models import User

class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    date_of_birth = models.DateField(null=True, blank=True) 
    specialization = models.CharField(max_length=100)
    # others like address, clinic(if any)
    def __str__(self):
        return f'{self.user.last_name}, {self.user.first_name}'

class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    date_of_birth = models.DateField(null=True, blank=True) 

    def __str__(self):
        return f'{self.user.last_name}, {self.user.first_name}'
    

class Appointment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    appointment_date = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=[('scheduled', 'Scheduled'), ('completed', 'Completed'), ('canceled', 'Canceled')])
    
    def __str__(self):
        return f'Patient {self.patient.user.last_name} & Doctor {self.doctor.doctor_name}'
    