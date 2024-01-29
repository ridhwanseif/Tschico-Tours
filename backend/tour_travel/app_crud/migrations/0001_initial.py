# Generated by Django 4.2.5 on 2024-01-19 19:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Destination',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('photo', models.ImageField(blank=True, null=True, upload_to='destination_photos')),
            ],
        ),
        migrations.CreateModel(
            name='DestinationArea',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('photo', models.ImageField(blank=True, null=True, upload_to='destination_photos')),
                ('destination', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_crud.destination')),
            ],
        ),
        migrations.CreateModel(
            name='Excursions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('shotDescription', models.TextField()),
                ('longDescription', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('mid_name', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('username', models.CharField(max_length=255)),
                ('address', models.CharField(max_length=255)),
                ('password', models.CharField(max_length=128)),
                ('phone_number', models.CharField(max_length=255)),
                ('status', models.BooleanField(default=False)),
                ('photo', models.ImageField(blank=True, null=True, upload_to='User_photos')),
                ('login_count', models.PositiveIntegerField(default=0)),
                ('is_verified', models.BooleanField(default=False)),
                ('verification_token', models.CharField(blank=True, max_length=255, null=True)),
                ('reset_token', models.CharField(blank=True, max_length=255, null=True)),
                ('role', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_crud.role')),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('subtitle', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('photo', models.ImageField(upload_to='post_photos')),
                ('users', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_crud.users')),
            ],
        ),
        migrations.CreateModel(
            name='ExcursionsPhoto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='excursions_photos/')),
                ('excursions', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_crud.excursions')),
            ],
        ),
        migrations.AddField(
            model_name='excursions',
            name='users',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_crud.users'),
        ),
        migrations.CreateModel(
            name='DestinationPhoto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='destinationArea_photos/')),
                ('destinationArea', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_crud.destinationarea')),
            ],
        ),
        migrations.AddField(
            model_name='destination',
            name='users',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_crud.users'),
        ),
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstName', models.CharField(max_length=255, null=True)),
                ('lastName', models.CharField(max_length=255, null=True)),
                ('email', models.EmailField(max_length=255)),
                ('order_date', models.DateTimeField()),
                ('description', models.TextField(null=True)),
                ('pickUp_Location', models.CharField(max_length=255, null=True)),
                ('dropOff_Location', models.CharField(max_length=255, null=True)),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('completed', 'Completed'), ('incomplete', 'incomplete'), ('rejected', 'rejected')], default='incomplete', max_length=10)),
                ('destination', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='app_crud.destination')),
                ('excursions', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='app_crud.excursions')),
            ],
        ),
        migrations.CreateModel(
            name='About',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('subtitle', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('users', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_crud.users')),
            ],
        ),
    ]
