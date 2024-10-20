from django import forms
from django.contrib.auth.models import User
from .models import Patient, Doctor

class UserForm(forms.ModelForm):
    password1 = forms.CharField(widget=forms.PasswordInput, label='Password')
    password2 = forms.CharField(widget=forms.PasswordInput, label='Confirm Password')

    class Meta:
        model = User
        fields = ("first_name", "last_name", "username", "email")

    def clean(self):
        cleaned_data = super().clean()
        first_name = cleaned_data.get('first_name')
        last_name = cleaned_data.get('last_name')
        username = cleaned_data.get('username')
        email = cleaned_data.get('email')
        password1 = cleaned_data.get('password1')
        password2 = cleaned_data.get('password2')

        if not first_name:
            self.add_error('first_name', 'First name is required')

        if not last_name:
            self.add_error('last_name', 'Last name is required')
        
        if User.objects.filter(username=username).exists():
            self.add_error('username', 'Username is already taken')

        if not email:
            self.add_error('email', 'Email is required')
        elif User.objects.filter(username=username).exists():
            self.add_error('email', 'Email is already taken')

        if password1 != password2:
            self.add_error('password1', 'Passwords do not match')


class PatientForm(forms.ModelForm):
    class Meta:
        model = Patient
        fields = ("date_of_birth", "gender")

    def clean(self):
        cleaned_data = super().clean()
        gender = cleaned_data.get('gender')
        
        if gender == 'select':
            self.add_error('gender', 'Gender is required')


class DoctorForm(forms.ModelForm):
    class Meta:
        model = Doctor
        fields = ("date_of_birth", "gender", "specialty", "clinic_address", "medical_license")

    def clean(self):
        cleaned_data = super().clean()
        gender = cleaned_data.get('gender')
        specialty = cleaned_data.get('specialty')
        
        if gender == 'select':
            self.add_error('gender', 'Gender is required')

        if specialty == 'select':
            self.add_error('specialty', 'Specialty is required')