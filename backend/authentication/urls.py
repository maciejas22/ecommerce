from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import MyTokenObtainPairView, ProfileView, UpdatePassword

urlpatterns = [
    path("token/", MyTokenObtainPairView.as_view(), name="get_token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    path("profile/", ProfileView.as_view(), name="profile"),
    path("profile/update_password/", UpdatePassword.as_view(), name="update_password"),
]
