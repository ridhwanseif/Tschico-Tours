# Generated by Django 4.2.5 on 2024-01-22 03:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_crud', '0007_destinationarea_longdescription_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='destinationarea',
            name='description',
        ),
    ]