from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Profile, Address, City, Country


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

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
    city = CitySerializer(required=False)

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
    address = AddressSerializer(required=False)

    class Meta:
        model = Profile
        fields = ("first_name", "last_name", "username", "email", "password", "address")
        extra_kwargs = {
            "username": {"required": True, "validators": [UniqueValidator(queryset=Profile.objects.all())]},
            "email": {"required": True, "validators": [UniqueValidator(queryset=Profile.objects.all())]},
            "password": {"required": True, "write_only": True, "validators": [validate_password]},
        }

    def create(self, validated_data):
        password = validated_data.pop("password")
        address_data = validated_data.pop("address", None)
        profile = Profile.objects.create(**validated_data)
        profile.set_password(password)
        if address_data:
            address = AddressSerializer.create(AddressSerializer(), address_data)
            profile.address = address
        profile.save()
        return profile

    def update(self, instance, validated_data):
        address_data = validated_data.pop("address", None)
        for key, value in validated_data.items():
            setattr(instance, key, value)
        if address_data:
            address = AddressSerializer.create(AddressSerializer(), address_data)
            instance.address = address
        instance.save()
        return instance

    def get_extra_kwargs(self):
        extra_kwargs = super().get_extra_kwargs()
        if self.context['request'].method != "POST":
            extra_kwargs["username"]["required"] = False
            extra_kwargs["email"]["required"] = False
            extra_kwargs["password"]["required"] = False
        return extra_kwargs


class ChangePasswordSerializer(serializers.Serializer):
    model = Profile

    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        validate_password(value)
        return value

    def validate(self, attrs):
        if self.context['request'].user.check_password(attrs['old_password']):
            return attrs
        else:
            raise serializers.ValidationError({"old_password": ["Wrong password."]})
