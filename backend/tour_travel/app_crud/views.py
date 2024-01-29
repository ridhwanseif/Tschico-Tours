from django.core.mail import send_mail
from django.contrib.auth.hashers import make_password
from rest_framework import generics, parsers, serializers
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import check_password
from rest_framework.response import Response
from app_crud.models import (
    Users, Role, Booking,
    Excursions, Destination,
    About, Post, DestinationArea,
    DestinationPhoto,
    ExcursionsPhoto,
    Notification
)
from app_crud.serializers import (
    UserSerializerPost, UserSerializer,
    RoleSerializer, PostSerializer,
    AboutSerializer, DestinationSerializer,
    DestinationAreaSerializer, DestinationPhotoSerializer,
    ExcursionsSerializer, ExcursionsPhotoSerializer,
    BookingSerializer, DestinationAreaSerializerCreate,
    NotificationSerializer, NotificationSerializerPost,
)
from django.contrib.auth.hashers import check_password
import random
import string


# role
class RoleListView(generics.ListAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer


class RoleCreateView(generics.CreateAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer


class RoleRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
# end role


# UserViews
# register user
@api_view(['POST'])
def register(request):
    serializer = UserSerializerPost(
        data=request.data, context={'request': request})

    if serializer.is_valid():
        user = serializer.save()
        # Generate the verification token
        verification_token = generate_verification_token()
        # Assign the token to the TechUser instance
        user.verification_token = verification_token
        user.save()  # Save the changes
        send_verification_email(user.email, verification_token)
        return Response({'message': 'User registered successfully'})
    else:
        return Response(serializer.errors, status=400)


def generate_verification_token():
    letters_and_digits = string.ascii_letters + string.digits
    return ''.join(random.choice(letters_and_digits) for _ in range(32))


def send_verification_email(email, token):
    subject = 'Verify your email'
    message = f' Your verify token is : {token}' + \
        f'\n Click the following link to verify your email: {settings.FRONTEND_URL}/verify/{token}/'
    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [email])
# end register user

# verify_user_email


@api_view(['GET'])
def verify_email(request, token):
    try:
        tech_user = Users.objects.get(verification_token=token)
        tech_user.is_verified = True
        tech_user.verification_token = None
        tech_user.save()
        return Response({'message': 'Email verification successful'})
    except Users.DoesNotExist:
        return Response({'message': 'Invalid verification token'}, status=400)
# end verify_user_email


# forgot_password
@api_view(['POST'])
def forgot_password(request):
    email = request.data.get('email')

    try:
        tech_user = Users.objects.get(email=email)
        reset_token = tech_user.generate_reset_token()
        send_reset_password_email(tech_user.email, reset_token)
        return Response({'message': 'Password reset email sent'})
    except Users.DoesNotExist:
        return Response({'message': 'Invalid email'}, status=400)


def send_reset_password_email(email, token):
    subject = 'Reset your password'
    message = f' Your reset_password token is : {token}' + \
        f'\n Click the following link to reset your password: {settings.FRONTEND_URL}/reset-password/{token}/'
    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [email])
# end forgot_password

# reset_password


@api_view(['POST'])
def reset_password(request, token):
    password = request.data.get('password')

    try:
        user = Users.objects.get(reset_token=token)
        user.is_verified = True
        user.password = make_password(password)  # Set the hashed password
        user.reset_token = None
        user.reset_token = user.generate_reset_token()
        user.save()
        return Response({'message': 'Password reset successful'})
    except Users.DoesNotExist:
        return Response({'message': 'Invalid reset token'}, status=400)
# end reset_password

# change_password


@api_view(['POST'])
def change_password(request, user_id):
    password = request.data.get('password')
    new_password = request.data.get('new_password')
    confirm_password = request.data.get('confirm_password')

    try:
        user = Users.objects.get(id=user_id)
        if check_password(password, user.password):
            if new_password == confirm_password:
                user.password = make_password(
                    new_password)  # Set the hashed password
                user.save()
                return Response({'message': 'Password change successful'})
            else:
                return Response({'message': 'New password and confirm password do not match'}, status=400)
    except Users.DoesNotExist:
        return Response({'message': 'Invalid reset token'}, status=400)
# end change_password


# logIn

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = Users.objects.get(email=email)
        if check_password(password, user.password):
            if user.is_verified:
                # Increment the login count
                user.login_count += 1
                user.save()

                # Fetch the role and userId from the user object
                role = user.role.name
                is_verified = user.is_verified
                user_id = user.id
                login_count = user.login_count
                status = user.status

                return Response({
                    'message': 'Valid login',
                    'role': role,
                    'user_id': user_id,
                    'login_count': login_count,
                    'is_verified': is_verified,
                    'status': status
                })
            else:
                return Response({
                    'message': 'Account not verified'
                })

    except Users.DoesNotExist:
        pass

    return Response({
        'message': 'Invalid credentials'
    }, status=400)
# end logIn


class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer

# all user


class UserListView(generics.ListAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
# end all user


@api_view(['GET'])
def verify_user(request, user_id):
    try:
        tech_user = Users.objects.get(id=user_id)
        if not tech_user.status:
            tech_user.status = True
            tech_user.save()
            return Response({'message': 'User verification successful'})
        else:
            return Response({'message': 'User is already verified'})
    except Users.DoesNotExist:
        return Response({'message': 'Invalid verification user'}, status=400)
# end UserViews

# Post Views


class PostListView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostCreateView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
# end Post Views

# About Views


class AboutListView(generics.ListAPIView):
    queryset = About.objects.all()
    serializer_class = AboutSerializer


class AboutCreateView(generics.CreateAPIView):
    queryset = About.objects.all()
    serializer_class = AboutSerializer


class AboutRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = About.objects.all()
    serializer_class = AboutSerializer
# end About Views

# Destination Views


class DestinationListView(generics.ListAPIView):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer


class DestinationCreateView(generics.CreateAPIView):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer


class DestinationRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer
# end Destination Views

# DestinationArea Views


class DestinationAreaListView(generics.ListAPIView):
    queryset = DestinationArea.objects.all()
    serializer_class = DestinationAreaSerializer


class DestinationAreaCreateView(generics.CreateAPIView):
    queryset = DestinationArea.objects.all()
    serializer_class = DestinationAreaSerializerCreate


class DestinationAreaRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DestinationArea.objects.all()
    serializer_class = DestinationAreaSerializerCreate
# end DestinationArea Views

# DestinationPhoto Views


class DestinationPhotoListView(generics.ListAPIView):
    queryset = DestinationPhoto.objects.all()
    serializer_class = DestinationPhotoSerializer


class DestinationPhotoCreateView(generics.CreateAPIView):
    queryset = DestinationArea.objects.all()
    serializer_class = DestinationPhotoSerializer


class DestinationPhotoRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DestinationPhoto.objects.all()
    serializer_class = DestinationPhotoSerializer
# end DestinationPhoto Views

# Excursions Views


class ExcursionsListView(generics.ListAPIView):
    queryset = Excursions.objects.all()
    serializer_class = ExcursionsSerializer


class ExcursionsCreateView(generics.CreateAPIView):
    queryset = Excursions.objects.all()
    serializer_class = ExcursionsSerializer


class ExcursionsRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Excursions.objects.all()
    serializer_class = ExcursionsSerializer
# end Excursions Views

# ExcursionsPhoto Views


class ExcursionsPhotoListView(generics.ListAPIView):
    queryset = ExcursionsPhoto.objects.all()
    serializer_class = ExcursionsPhotoSerializer


class ExcursionsPhotoCreateView(generics.CreateAPIView):
    queryset = ExcursionsPhoto.objects.all()
    serializer_class = ExcursionsPhotoSerializer


class ExcursionsPhotoRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ExcursionsPhoto.objects.all()
    serializer_class = ExcursionsPhotoSerializer
# end ExcursionsPhoto Views

# Booking Views


class BookingListView(generics.ListAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer


class BookingCreateView(generics.CreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer


class BookingRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer


@api_view(['POST'])
def booking(request):
    serializer = BookingSerializer(
        data=request.data, context={'request': request})
    if serializer.is_valid():
        booking = serializer.save()

        # Send confirmation email to the user
        send_verification_email(
            booking.email, booking.firstName, booking.lastName)

        # Send notification email to yourself
        send_notification_email(booking.firstName,
                                booking.lastName,
                                booking.pickUp_Location,
                                booking.dropOff_Location,
                                booking.order_date)

        return Response({'message': 'Booking is successfully'})
    else:
        return Response(serializer.errors, status=400)


def send_verification_email(email, firstName, lastName):
    subject = 'Booking verification form The Zanzibar Taxi'
    message = f'Hi {firstName} {lastName}' + \
        f'\n our Team will get back to you within 24 hours.' + \
        f'\n Thank you for your booking!'
    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [email])


def send_notification_email(firstName, lastName, pickUp_Location, dropOff_Location, order_date):
    subject = 'New Booking Notification'
    message = f'Hi, you have new booking form {firstName} {lastName}' + \
        f'\n PickUp Loacation: {pickUp_Location} .' + \
        f'\n DropOff Location: {dropOff_Location} .' + \
        f'\n Date : {order_date}.' + \
        f'\n  NOTE .'

    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL,
              [settings.EMAIL_HOST_USER])
# end Booking Views


# Notifivation


class NotifivationListView(generics.ListAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer


class NotifivationCreateView(generics.CreateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializerPost


class NotifivationRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer


@api_view(['POST'])
def notification(request):
    serializer = NotificationSerializer(
        data=request.data, context={'request': request})
    if serializer.is_valid():
        notification = serializer.save()

        # Send notification email to yourself
        send_notification_email(notification.email,
                                notification.content)

        return Response({'message': 'Booking is successfully'})
    else:
        return Response(serializer.errors, status=400)


def send_notification_email( email, content):
    subject = 'Booking Confirmation Notification'
    message = f'Hi,{content}.' + \
        f'\n  NOTE .'

    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL,
              [email])
# end Notifivation

# Notifivation
