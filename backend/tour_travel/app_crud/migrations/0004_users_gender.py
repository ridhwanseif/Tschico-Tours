# Generated by Django 4.2.5 on 2024-01-20 05:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_crud', '0003_delete_bookings'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='gender',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]