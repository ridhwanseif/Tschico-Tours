# Generated by Django 4.2.5 on 2024-01-21 09:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app_crud', '0004_users_gender'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('notificationStatus', models.CharField(choices=[('read', 'read'), ('unreceived', 'unreceived'), ('received', 'received')], default='unreceived', max_length=10)),
                ('received_date', models.DateTimeField(auto_now_add=True)),
                ('content', models.TextField(null=True)),
                ('techUser', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_crud.users')),
            ],
        ),
    ]
