from django.urls import path
from . import views

urlpatterns = [
    path('api/booking/save/', views.save_booking_details, name='save_booking_details'),
    path('api/booking/upload-screenshot/', views.upload_screenshot, name='upload_screenshot'),
    path('api/booking/<str:booking_id>/', views.get_booking_details, name='get_booking_details'),
]
