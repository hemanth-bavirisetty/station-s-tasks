# tasks/views.py

from django.contrib.auth import login, logout
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserRegisterSerializer, LoginSerializer
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


# Register view for creating users
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]

# Login view (POST to /api/login/)
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            login(request, user)
            return Response({"message": "Logged in successfully!"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # Logout the user and delete the session
        logout(request)
        return Response({"message": "Logged out successfully!"}, status=status.HTTP_200_OK)





