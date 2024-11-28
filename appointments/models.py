from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import User

class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    date_of_birth = models.DateField(null=False, blank=False)
    gender = models.CharField(max_length=10, null=False, blank=False)
    specialty = models.CharField(max_length=100, null=False, blank=False)
    clinic_address = models.CharField(max_length=200, null=False, blank=False)
    medical_license = models.ImageField(upload_to='licenses/' ,null=False, blank=False)

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'

class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE) 
    date_of_birth = models.DateField(null=False, blank=False)
    gender = models.CharField(max_length=10, null=False, blank=False)

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'
    

class Appointment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    appointment_date = models.DateTimeField(null=False, blank=False)
    status = models.CharField(max_length=20, 
                              choices=[
                                  # Appt. status for patient
                                  ('scheduled', 'Scheduled'),
                                  ('rejected', 'Rejected'),
                                  
                                  # Appt. status for doctor
                                  ('pending', 'Pending'),
                                  ('canceled', 'Canceled'),
                                  ('completed', 'Completed'), 
                                ],
                              null=False, blank=False)
    
    def __str__(self):
        return f'Patient {self.patient.user.last_name} & Doctor {self.doctor.user.first_name} - {self.status}'
    
class Notification(models.Model):
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE)
    notification_type = models.CharField(
        max_length=20,
        choices=[
            # Patient notification
            ('accepted', 'Accepted'),
            ('rejected', 'Rejected'),
            ('rescheduled', 'Rescheduled'),

            # Doctor notification
            ('set', 'Set'),
            ('canceled', 'Canceled')
        ],
        default='set', blank=False)
    created_at = models.DateTimeField(default=now)

    def __str__(self):
        return f'{self.appointment} [{self.notification_type}]'
    
    