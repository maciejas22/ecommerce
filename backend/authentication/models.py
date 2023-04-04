from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import AbstractUser


class Country(models.Model):
    name = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.name


class City(models.Model):
    name = models.CharField(max_length=50, blank=True)
    postal_code = models.CharField(max_length=10, blank=True)
    country = models.ForeignKey(Country, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Address(models.Model):
    street = models.CharField(max_length=50, blank=True)
    number = models.SmallIntegerField(blank=True, null=True, validators=[MinValueValidator(1), MaxValueValidator(99)])
    apartment_number = models.SmallIntegerField(blank=True, null=True,
                                                validators=[MinValueValidator(1), MaxValueValidator(99)])
    city = models.ForeignKey(City, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.street + " " + self.number + ", " + self.city.name


class Profile(AbstractUser):
    address = models.ForeignKey(Address, on_delete=models.CASCADE, blank=True, null=True)
