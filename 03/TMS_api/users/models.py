from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

class User(AbstractUser):
    """
    Custom User model.
    """

    # Define additional fields here
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    #profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)

    # Define choices for fields with limited options
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    ]

    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, blank=True, null=True)

    # Define a custom save method to perform actions before saving the user
    def save(self, *args, **kwargs):
        # Example: Convert email to lowercase before saving
        self.email = self.email.lower()
        super().save(*args, **kwargs)

    # Define a custom string representation of the user
    def __str__(self):
        return f"{self.username} ({self.email})"

    # Define a custom method to get the user's full name
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"