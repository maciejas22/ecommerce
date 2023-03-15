from rest_framework import generics, permissions
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Address

from .serializers import AddressSerializer, MyTokenObtainPairSerializer, ProfileSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class ProfileCreateView(generics.CreateAPIView):
    serializer_class = ProfileSerializer

    def perform_create(self, serializer):
        serializer.save()

class ProfileRetrieveView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer

    def get_object(self):
        return self.request.user

class ProfileUpdateView(generics.UpdateAPIView):
    serializer_class = AddressSerializer
    queryset = Address.objects.all()

    def get_object(self):
        return self.request.user.address

