import uuid

from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


class Country(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.name


class City(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50, blank=True)
    postal_code = models.CharField(max_length=10, blank=True)
    country = models.ForeignKey(Country, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Address(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    street = models.CharField(max_length=50, blank=True)
    number = models.SmallIntegerField(blank=True, null=True, validators=[MinValueValidator(1), MaxValueValidator(99)])
    apartment_number = models.SmallIntegerField(blank=True, null=True,
                                                validators=[MinValueValidator(1), MaxValueValidator(99)])
    city = models.ForeignKey(City, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.street} {self.number}, {self.city.name}"


class Profile(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    avatar = models.ImageField(upload_to="assets/users/", blank=True, null=True)
    address = models.OneToOneField(Address, on_delete=models.CASCADE, blank=True, null=True)
