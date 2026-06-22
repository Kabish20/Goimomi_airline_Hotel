from django.db import models

class Booking(models.Model):
    booking_id = models.CharField(max_length=50, unique=True, db_index=True, help_text="Booking ID, e.g. TJ1189178071008")
    booking_date = models.DateTimeField(help_text="Date and time the booking was made")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-booking_date']

    def __str__(self):
        return f"Booking {self.booking_id} ({self.booking_date.strftime('%Y-%m-%d %H:%M')})"


class Passenger(models.Model):
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='passengers')
    title = models.CharField(max_length=20, blank=True, null=True, help_text="e.g. MR, MRS, MS")
    first_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    full_name = models.CharField(max_length=255, help_text="Full passenger name, e.g. MR IMTIYAZ SAIT RAZACK SAIT")
    date_of_birth = models.DateField(blank=True, null=True, help_text="Date of birth")
    passport_number = models.CharField(max_length=50, blank=True, null=True)
    frequent_flyer_number = models.CharField(max_length=50, blank=True, null=True)
    other_info = models.CharField(max_length=100, blank=True, null=True, help_text="Additional identity info, e.g. ( A )")

    def __str__(self):
        return self.full_name


class FlightSegment(models.Model):
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='segments')
    sequence = models.IntegerField(default=1, help_text="Determines the sequence of flight legs in the itinerary")
    
    airline_name = models.CharField(max_length=100, help_text="e.g. Oman Aviation")
    airline_code = models.CharField(max_length=10, blank=True, null=True, help_text="e.g. WY")
    flight_number = models.CharField(max_length=20, help_text="e.g. 252")
    airline_logo = models.CharField(max_length=150, blank=True, null=True, default="oman-air-logo-circular.png", help_text="Filename of the airline logo, e.g. oman-air-logo-circular.png")
    
    departure_airport_name = models.CharField(max_length=150, help_text="e.g. Chennai Arpt")
    departure_city = models.CharField(max_length=100, help_text="e.g. Chennai")
    departure_country = models.CharField(max_length=100, help_text="e.g. India")
    departure_terminal = models.CharField(max_length=50, blank=True, null=True, help_text="e.g. Terminal 2")
    departure_time = models.DateTimeField()
    
    arrival_airport_name = models.CharField(max_length=150, help_text="e.g. Muscat Internatonal Arpt")
    arrival_city = models.CharField(max_length=100, help_text="e.g. Muscat")
    arrival_country = models.CharField(max_length=100, help_text="e.g. Oman")
    arrival_terminal = models.CharField(max_length=50, blank=True, null=True, help_text="e.g. Terminal 1")
    arrival_time = models.DateTimeField()
    
    duration = models.CharField(max_length=30, help_text="e.g. 3h 50m")
    duration_minutes = models.IntegerField(blank=True, null=True)
    
    cabin_class = models.CharField(max_length=50, default="Economy", help_text="e.g. Economy, Business")
    fare_type = models.CharField(max_length=50, default="NA")
    
    checkin_baggage = models.CharField(max_length=50, blank=True, null=True, help_text="e.g. 30KG")
    cabin_baggage = models.CharField(max_length=50, blank=True, null=True, help_text="e.g. 7KG")
    
    layover_duration = models.CharField(max_length=30, blank=True, null=True, help_text="Layover timer after this segment, e.g. 4h 15m")
    layover_minutes = models.IntegerField(blank=True, null=True)

    class Meta:
        ordering = ['sequence']

    def __str__(self):
        return f"Leg {self.sequence}: {self.departure_city} ({self.airline_code}-{self.flight_number}) -> {self.arrival_city}"


class PassengerSegmentDetail(models.Model):
    passenger = models.ForeignKey(Passenger, on_delete=models.CASCADE, related_name='segment_details')
    segment = models.ForeignKey(FlightSegment, on_delete=models.CASCADE, related_name='passenger_details')
    pnr = models.CharField(max_length=50, help_text="Airline PNR for this passenger on this segment, e.g. ONFDOJ")
    ticket_number = models.CharField(max_length=100, blank=True, null=True, help_text="Ticket number specific to this segment/passenger")
    
    # Preferences
    seat_number = models.CharField(max_length=20, blank=True, null=True)
    meal_preference = models.CharField(max_length=100, blank=True, null=True)
    baggage_preference = models.CharField(max_length=100, blank=True, null=True)
    seat_preference = models.CharField(max_length=100, blank=True, null=True)
    other_preference = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        unique_together = ('passenger', 'segment')

    def __str__(self):
        return f"{self.passenger} on {self.segment} (PNR: {self.pnr})"
