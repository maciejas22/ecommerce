from django import forms
from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import Profile, Address, City, Country

class ProfileAdmin(UserAdmin):
    fieldsets = (
        ('Credentials ', {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email', 'avatar', 'address')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )

admin.site.register(Profile, ProfileAdmin)
admin.site.register(Address)
admin.site.register(Country)
admin.site.register(City)
admin.site.unregister(Group)
