from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

from .models import Patient

class SignUpForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'password1', 'password2']

    def save(self, commit=True):
        user = super().save(commit=False)

        if commit:
            user.save()
            Patient.objects.create(user=user)
    
        return user