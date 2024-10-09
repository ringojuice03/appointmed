from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms

from .models import Patient, Doctor

class PatientSignUpForm(UserCreationForm):
    first_name = forms.CharField(max_length=30, required=True,)
    last_name = forms.CharField(max_length=30, required=True,)
    date_of_birth = forms.DateField(required=True, help_text='Required. Format: YYYY-MM-DD')

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'date_of_birth','password1', 'password2']

    def save(self, commit=True):
        user = super().save(commit=False)
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']

        if commit:
            user.save()
            Patient.objects.create(
                user = user,
                date_of_birth = self.cleaned_data['date_of_birth'],
            )
    
        return user

# class Doctor(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     date_of_birth = models.DateField(null=True, blank=True) 
#     specialization = models.CharField(max_length=100)

class DoctorSignUpForm(UserCreationForm):
    first_name = forms.CharField(max_length=30, required=True,)
    last_name = forms.CharField(max_length=30, required=True,)
    date_of_birth = forms.DateField(required=True, help_text='Required. Format: YYYY-MM-DD')
    specialization = forms.CharField(max_length=30, required=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'date_of_birth', 'specialization', 'password1', 'password2']

    def save(self, commit=True):
        user = super().save(commit=False)
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        
        if commit:
            user.save()
            Doctor.objects.create(
                user = user,
                date_of_birth = self.cleaned_data['date_of_birth'],
                specialization = self.cleaned_data['specialization'],
            )