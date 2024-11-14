from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .models import User

class SignUpForm(UserCreationForm):
    email = forms.EmailField()
    password2 = forms.CharField(widget=forms.PasswordInput, label='Confirm Password')

    class Meta:
        model = User
        fields = ['username', 'email']

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get("password")
        password2 = cleaned_data.get("password2")

        if password != password2:
            raise forms.ValidationError("Passwords do not match.")
        return cleaned_data