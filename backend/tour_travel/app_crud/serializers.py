from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from app_crud.models import (
    Users, Role, 
    Booking, Excursions, 
    Destination, About, 
    Post, DestinationArea, 
    DestinationPhoto, ExcursionsPhoto,
    Notification )

# role
class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ('id', 'name')
# end role

# User serializers
class UserSerializerPost(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    photo = serializers.ImageField(required=False)

    class Meta:
        model = Users
        fields = '__all__'

        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        photo = self.context['request'].FILES.get('photo')
        password = validated_data.pop('password')
        validated_data['password'] = make_password(password)
        user = Users.objects.create(**validated_data)
        if photo:
            user.photo.save(photo.name, photo)
        return user
    
class UserSerializerPut(serializers.ModelSerializer):
    class Meta:
        model = Users
        exclude = ('role', 'password',)

   #################################################

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    role = RoleSerializer(read_only=True)
    photo = serializers.ImageField(required=False)

    class Meta:
        model = Users
        fields = '__all__'

        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        photo = self.context['request'].FILES.get('photo')
        password = validated_data.pop('password')
        validated_data['password'] = make_password(password)
        user = Users.objects.create(**validated_data)
        if photo:
            user.photo.save(photo.name, photo)
        return user

# end User serializers

# Post serializers
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
# End Post serializers

# About serializers
class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = About
        fields = '__all__'
# End About serializers

# Destination serializers
class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = '__all__'
# End Destination serializers

# DestinationArea serializers
class DestinationAreaSerializer(serializers.ModelSerializer):
    destination = DestinationSerializer(read_only=True)
    class Meta:
        model = DestinationArea
        fields = '__all__'

class DestinationAreaSerializerCreate(serializers.ModelSerializer):
    class Meta:
        model = DestinationArea
        fields = '__all__'
# End DestinationArea serializers

# DestinationPhoto serializers
class DestinationPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DestinationPhoto
        fields = '__all__'
# End DestinationPhoto serializers

# Excursions serializers
class ExcursionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Excursions
        fields = '__all__'
# End Excursion serializers

# ExcursionsPhoto serializers
class ExcursionsPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExcursionsPhoto
        fields = '__all__'
# End ExcursionsPhoto serializers

# Booking serializers
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
# End Booking serializers
        
# start Notification
class NotificationSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Notification
        fields = '__all__'

class NotificationSerializerPost(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

# end Notification
