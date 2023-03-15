from django.urls import path

from rest_framework_simplejwt.views import TokenRefreshView

from .views import MyTokenObtainPairView, ProfileCreateView, ProfileRetrieveView, ProfileUpdateView

urlpatterns = [
    path("token/", MyTokenObtainPairView.as_view(), name="get_token"),
    path("token/create/", ProfileCreateView.as_view(), name="create_token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    path("profile/", ProfileRetrieveView.as_view(), name="profile"),
    path("profile/update/", ProfileUpdateView.as_view(), name="update_profile"),
]
