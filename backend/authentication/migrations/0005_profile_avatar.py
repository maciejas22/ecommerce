# Generated by Django 4.1.6 on 2023-05-12 10:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0004_alter_address_apartment_number_alter_address_city_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='avatar',
            field=models.ImageField(blank=True, null=True, upload_to='assets/users/'),
        ),
    ]
