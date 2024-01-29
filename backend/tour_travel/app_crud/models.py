from django.db import models
from django.utils.crypto import get_random_string
from django.contrib.gis.db import models as gis_models
from multiupload.fields import MultiFileField


# role table
class Role(models.Model):
    name = models.CharField(max_length=20, unique=True)
# end role table

# User table


class Users(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    mid_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    gender = models.CharField(max_length=10, blank=True, null=True)
    password = models.CharField(max_length=128)
    phone_number = models.CharField(max_length=255)
    status = models.BooleanField(default=False)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    photo = models.ImageField(
        upload_to='User_photos', blank=True, null=True)
    login_count = models.PositiveIntegerField(default=0)
    is_verified = models.BooleanField(default=False)
    verification_token = models.CharField(
        max_length=255, null=True, blank=True)
    reset_token = models.CharField(max_length=255, null=True, blank=True)

    def generate_reset_token(self):
        token = get_random_string(length=32)
        self.reset_token = token
        self.save()
        return token

    def __str__(self):
        return self.email
# end User table

# about table


class About(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255)
    description = models.TextField()
    users = models.ForeignKey(Users, on_delete=models.CASCADE)
# end about table

# post table


class Post(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255)
    description = models.TextField()
    photo = models.ImageField(
        upload_to='post_photos')
    users = models.ForeignKey(Users, on_delete=models.CASCADE)
# end post table

# Destination table


class Destination(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    photo = models.ImageField(
        upload_to='destination_photos', blank=True, null=True)
    users = models.ForeignKey(Users, on_delete=models.CASCADE)


class DestinationArea(models.Model):
    title = models.CharField(max_length=255)
    # description = models.TextField()
    shotDescription = models.TextField(blank=True, null=True)
    longDescription = models.TextField(blank=True, null=True)
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE)
    photo = models.ImageField(
        upload_to='destination_photos', blank=True, null=True)
    price = models.CharField(max_length=25, blank=True, null=True)


class DestinationPhoto(models.Model):
    destinationArea = models.ForeignKey(
        DestinationArea, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='destinationArea_photos/')

    def __str__(self):
        return self.post.title + " - Photo"
# end Destination table

# # Excursions table


class Excursions(models.Model):
    title = models.CharField(max_length=255)
    highlight = models.TextField(blank=True, null=True)
    inclusion = models.TextField(blank=True, null=True)
    exclusion = models.TextField(blank=True, null=True)
    longDescription = models.TextField()
    users = models.ForeignKey(Users, on_delete=models.CASCADE)
    price = models.CharField(max_length=25, blank=True, null=True)

class ExcursionsPhoto(models.Model):
    excursions = models.ForeignKey(Excursions, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='excursions_photos/')

    def __str__(self):
        return self.post.title + " - Photo"
# # end Excursions table

# start of Booking


class Booking(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('incomplete', 'incomplete'),
        ('rejected', 'rejected'),
    )
    firstName = models.CharField(max_length=255, null=True)
    lastName = models.CharField(max_length=255, null=True)
    # location = gis_models.PointField(geography=True)
    email = models.EmailField(max_length=255)
    order_date = models.DateTimeField()
    description = models.TextField(null=True)
    pickUp_Location = models.CharField(max_length=255, null=True)
    dropOff_Location = models.CharField(max_length=255, null=True)
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default='incomplete')
    excursions = models.ForeignKey(
        Excursions, null=True, on_delete=models.CASCADE)
    destination = models.ForeignKey(
        Destination, null=True, on_delete=models.CASCADE)
# end booking table

    # notification table


class Notification(models.Model):
    STATUS_CHOICES = (
        # ('pending', 'Pending'),
        ('read', 'read'),
        ('unreceived', 'unreceived'),
        ('received', 'received'),

    )
    notificationStatus = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default='unreceived')
    received_date = models.DateTimeField(auto_now_add=True)
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE,blank=True, null=True)
    content = models.TextField(null=True)
    email = models.EmailField(max_length=255, blank=True, null=True)
    # end notification table
