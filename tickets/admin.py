from django.contrib import admin
from .models import Booking, Passenger, FlightSegment, PassengerSegmentDetail

class PassengerInline(admin.TabularInline):
    model = Passenger
    extra = 1
    show_change_link = True

class FlightSegmentInline(admin.TabularInline):
    model = FlightSegment
    extra = 1
    ordering = ('sequence',)
    show_change_link = True

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('booking_id', 'booking_date', 'created_at', 'updated_at')
    search_fields = ('booking_id',)
    list_filter = ('booking_date', 'created_at')
    inlines = [PassengerInline, FlightSegmentInline]


class PassengerSegmentDetailInline(admin.TabularInline):
    model = PassengerSegmentDetail
    extra = 1

@admin.register(Passenger)
class PassengerAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'booking', 'title', 'date_of_birth', 'passport_number')
    search_fields = ('full_name', 'passport_number', 'booking__booking_id')
    list_filter = ('booking__booking_date',)
    inlines = [PassengerSegmentDetailInline]


@admin.register(FlightSegment)
class FlightSegmentAdmin(admin.ModelAdmin):
    list_display = (
        'sequence', 'booking', 'airline_code', 'flight_number', 
        'departure_city', 'departure_time', 'arrival_city', 'arrival_time'
    )
    search_fields = ('flight_number', 'departure_city', 'arrival_city', 'booking__booking_id')
    list_filter = ('airline_name', 'departure_time', 'cabin_class')
    ordering = ('booking', 'sequence')


@admin.register(PassengerSegmentDetail)
class PassengerSegmentDetailAdmin(admin.ModelAdmin):
    list_display = ('passenger', 'segment', 'pnr', 'ticket_number', 'seat_number')
    search_fields = ('passenger__full_name', 'pnr', 'ticket_number', 'segment__flight_number')
    list_filter = ('pnr', 'segment__cabin_class')
