from django.contrib.auth.password_validation import validate_password

from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Profile, Address, City, Country

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["first_name"] = user.first_name
        token["last_name"] = user.last_name
        token["username"] = user.username
        token["email"] = user.email

        return token

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ("name",)

class CitySerializer(serializers.ModelSerializer):
    country = CountrySerializer()

    class Meta:
        model = City
        fields = ("name", "postal_code", "country")

class AddressSerializer(serializers.ModelSerializer):
    city = CitySerializer()

    class Meta:
        model = Address
        fields = ("street", "number", "apartment_number", "city")
    
    def create(self, validated_data):
        city_data = validated_data.pop("city")
        country_data = city_data.pop("country")
        country, _ = Country.objects.get_or_create(**country_data)
        city, _ = City.objects.get_or_create(country=country, **city_data)
        address, _ = Address.objects.get_or_create(city=city, **validated_data)
        return address

class ProfileSerializer(serializers.ModelSerializer):
    address = AddressSerializer()

    username = serializers.CharField(
        required=True, validators=[UniqueValidator(queryset=Profile.objects.all())]
    )

    email = serializers.EmailField(
        required=True, validators=[UniqueValidator(queryset=Profile.objects.all())]
    )

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Profile
        fields = ("id", "first_name", "last_name", "username", "email", "password", "password2", "address")

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({"password": "Passwords must match."})

        return attrs

    def create(self, validated_data):
        validated_data.pop("password2")
        user = Profile.objects.create_user(**validated_data)
        return user

