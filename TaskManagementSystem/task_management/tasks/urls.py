# tasks/urls.py

# tasks/urls.py

from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, LoginView, LogoutView

urlpatterns = [
    # Register view (user signup)
    path('register/', RegisterView.as_view(), name='register'),
    
    # Login and Get Access & Refresh tokens
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # Refresh JWT Access Token
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Logout view (invalidate session)
    path('logout/', LogoutView.as_view(), name='logout'),
]
