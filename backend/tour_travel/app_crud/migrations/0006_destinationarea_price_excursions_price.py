# Generated by Django 4.2.5 on 2024-01-22 02:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_crud', '0005_notification'),
    ]

    operations = [
        migrations.AddField(
            model_name='destinationarea',
            name='price',
            field=models.CharField(blank=True, max_length=25, null=True),
        ),
        migrations.AddField(
            model_name='excursions',
            name='price',
            field=models.CharField(blank=True, max_length=25, null=True),
        ),
    ]
