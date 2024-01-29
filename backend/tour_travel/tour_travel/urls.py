from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from app_crud.views import (

    # role
    RoleListView, RoleCreateView, RoleRetrieveUpdateDestroyView,

    # user
    UserListView, UserRetrieveUpdateDestroyView, register, login, verify_email, forgot_password, reset_password, change_password, verify_user,

    # Post
    PostListView, PostCreateView, PostRetrieveUpdateDestroyView,

    # About
    AboutListView, AboutCreateView, AboutRetrieveUpdateDestroyView,

    # Destination
    DestinationListView, DestinationCreateView, DestinationRetrieveUpdateDestroyView,

    # DestinationArea
    DestinationAreaListView, DestinationAreaCreateView, DestinationAreaRetrieveUpdateDestroyView,

    # DestinationPhoto
    DestinationPhotoListView, DestinationPhotoCreateView, DestinationPhotoRetrieveUpdateDestroyView,

    # Excursions
    ExcursionsListView, ExcursionsCreateView, ExcursionsRetrieveUpdateDestroyView,

    # ExcursionsPhoto
    ExcursionsPhotoListView, ExcursionsPhotoCreateView, ExcursionsPhotoRetrieveUpdateDestroyView,

    # Booking
    BookingListView, BookingCreateView, BookingRetrieveUpdateDestroyView, booking,

    # nitification
    NotifivationCreateView, NotifivationListView, NotifivationRetrieveUpdateDestroyView, notification,
)

urlpatterns = [

    # all user
    path('api/users/', UserListView.as_view(), name='users-list'),
    path('api/register/', register, name='register'),
    path('api/login/', login, name='login'),
    path('api/verify/<str:token>/', verify_email, name='verify_email'),
    path('api/forgot-password/', forgot_password, name='forgot_password'),
    path('api/reset-password/<str:token>/',
         reset_password, name='reset_password'),
    path('api/change-password/<str:user_id>/',
         change_password, name='change_password'),
    path('api/verify_user/<int:user_id>/', verify_user, name='verify_user'),
    path('api/user/detail/<int:pk>/',
         UserRetrieveUpdateDestroyView.as_view(), name='user-detail'),

    # end user

    # role
    path('api/roles/', RoleListView.as_view(), name='role-list'),
    path('api/roles/create', RoleCreateView.as_view(), name='role-create'),
    path('api/roles/detail/<int:pk>/',
         RoleRetrieveUpdateDestroyView.as_view(), name='role-detail'),
    # end role

    # post
    path('api/posts/', PostListView.as_view(), name='post-list'),
    path('api/post/create', PostCreateView.as_view(), name='post-create'),
    path('api/post/rud/<int:pk>/',
         PostRetrieveUpdateDestroyView.as_view(), name='post-postRetrieveUpdateDestroyView'),
    # end post

    # about
    path('api/abouts/', AboutListView.as_view(), name='about-list'),
    path('api/about/create', AboutCreateView.as_view(), name='about-create'),
    path('api/about/rud/<int:pk>/',
         AboutRetrieveUpdateDestroyView.as_view(), name='about-postRetrieveUpdateDestroyView'),
    # end about

    # Destination
    path('api/destinations/', DestinationListView.as_view(),
         name='destination-list'),
    path('api/destination/create', DestinationCreateView.as_view(),
         name='destination-create'),
    path('api/destination/rud/<int:pk>/',
         DestinationRetrieveUpdateDestroyView.as_view(), name='destination-postRetrieveUpdateDestroyView'),
    # end Destination

    # DestinationArea
    path('api/destinationAreas/', DestinationAreaListView.as_view(),
         name='DestinationArea-list'),
    path('api/destinationArea/create', DestinationAreaCreateView.as_view(),
         name='DestinationArea-create'),
    path('api/destinationArea/rud/<int:pk>/',
         DestinationAreaRetrieveUpdateDestroyView.as_view(), name='DestinationArea-postRetrieveUpdateDestroyView'),
    # end DestinationArea

    # DestinationPhoto
    path('api/destinationPhotos/', DestinationPhotoListView.as_view(),
         name='destinationPhoto-list'),
    path('api/destinationPhoto/create', DestinationPhotoCreateView.as_view(),
         name='destinationPhoto-create'),
    path('api/destinationPhoto/rud/<int:pk>/',
         DestinationPhotoRetrieveUpdateDestroyView.as_view(), name='destination-postRetrieveUpdateDestroyView'),
    # end DestinationPhoto

    # Excursions
    path('api/excursions/', ExcursionsListView.as_view(), name='Excursions-list'),
    path('api/excursion/create', ExcursionsCreateView.as_view(),
         name='Excursions-create'),
    path('api/excursion/rud/<int:pk>/', ExcursionsRetrieveUpdateDestroyView.as_view(),
         name='Excursions-postRetrieveUpdateDestroyView'),
    # end Excursions

    # ExcursionsPhoto
    path('api/excursionPhotos/', ExcursionsPhotoListView.as_view(),
         name='ExcursionPhoto-list'),
    path('api/excursionPhoto/create', ExcursionsPhotoCreateView.as_view(),
         name='ExcursionPhoto-create'),
    path('api/excursionPhoto/rud/<int:pk>/', ExcursionsPhotoRetrieveUpdateDestroyView.as_view(),
         name='ExcursionPhoto-postRetrieveUpdateDestroyView'),
    # end ExcursionsPhoto

    # Booking
    path('api/booking/', BookingListView.as_view(),
         name='Booking-list'),
    #     path('api/booking/create', BookingCreateView.as_view(),
    #          name='Booking-create'),
    path('api/booking/rud/<int:pk>/', BookingRetrieveUpdateDestroyView.as_view(),
         name='Booking-postRetrieveUpdateDestroyView'),

    path('api/booking/create', booking, name='booking'),

    # end Booking

    # start Notification
    path('api/notification/criterial', NotifivationListView.as_view(),
         name='notification-list'),
#     path('api/notification/create', NotifivationCreateView.as_view(),
#          name='create-notification'),
    path('api/notification/<int:pk>/', NotifivationRetrieveUpdateDestroyView.as_view(),
         name='create-notification'),

    path('api/notification/create', notification, name='notification'),

    # end Notification


]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
