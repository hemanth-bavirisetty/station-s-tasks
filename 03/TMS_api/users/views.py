# views.py
from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.views import APIView
from django.contrib.auth import get_user_model

from .serializers import UserSerializer, LoginSerializer

User = get_user_model()

class RegisterView(generics.CreateAPIView): 
    """
    View for registering a new user.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

class LoginView(ObtainAuthToken):
    """
    View for logging in a user.
    """
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        """
        Handle a login request.
        """
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username,
        })

class LogoutView(APIView):
    """
    View for logging out a user.
    """
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        """
        Handle a logout request.
        """
        # Simply delete the token to log out
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)

class UserProfileView(generics.RetrieveAPIView):
    """
    View for retrieving a user's profile.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        """
        Get the user's profile.
        """
        return self.request.user

class UpdateUserProfileView(generics.UpdateAPIView):
    """
    View for updating a user's profile.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        """
        Get the user's profile.
        """
        return self.request.user

class DeleteUserProfileView(generics.DestroyAPIView):
    """
    View for deleting a user's profile.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        """
        Get the user's profile.
        """
        return self.request.user
