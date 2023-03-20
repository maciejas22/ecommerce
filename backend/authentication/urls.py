from django.urls import path

from rest_framework_simplejwt.views import TokenRefreshView

from .views import MyTokenObtainPairView, ProfileView

urlpatterns = [
    path("token/", MyTokenObtainPairView.as_view(), name="get_token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    path("profile/", ProfileView.as_view(), name="profile"),
]
