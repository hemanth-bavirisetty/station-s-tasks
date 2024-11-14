from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    # Add any additional fields here if needed
    # For example:
    # profile_picture = models.ImageField(upload_to='profile_pictures', blank=True)
    pass