from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.models import User

class EmailOrUsernameBackend(ModelBackend):
    def authenticate(self, request, username = None, password = None, **kwargs):
        try:
            if '@' in username:
                user = User.objects.get(email=username)
            else:
                user = User.objects.get(username=username)
        except User.DoesNotExist:
            return None
        
        if user.check_password(password):
            return user