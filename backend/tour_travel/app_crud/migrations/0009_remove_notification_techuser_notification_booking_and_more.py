# Generated by Django 4.2.5 on 2024-01-24 10:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app_crud', '0008_remove_destinationarea_description'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='notification',
            name='techUser',
        ),
        migrations.AddField(
            model_name='notification',
            name='booking',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app_crud.booking'),
        ),
        migrations.AlterField(
            model_name='excursions',
            name='shotDescription',
            field=models.TextField(blank=True, null=True),
        ),
    ]