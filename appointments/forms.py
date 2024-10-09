from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms

from .models import Patient

class SignUpForm(UserCreationForm):
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