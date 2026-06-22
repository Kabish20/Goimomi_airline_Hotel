import datetime
from django.core.management.base import BaseCommand
from django.utils import timezone
from tickets.models import Booking, Passenger, FlightSegment, PassengerSegmentDetail

class Command(BaseCommand):
    help = "Loads the sample ticket booking data from the three screenshots into the database"

    def handle(self, *args, **options):
        self.stdout.write("Initializing sample ticket data insertion...")

        # 1. Create the Booking
        booking_date = timezone.make_aware(datetime.datetime(2026, 6, 18, 18, 27, 0))
        booking, created = Booking.objects.get_or_create(
            booking_id="TJ1189178071008",
            defaults={"booking_date": booking_date}
        )
        if created:
            self.stdout.write(self.style.SUCCESS(f"Created Booking {booking.booking_id}"))
        else:
            self.stdout.write(f"Booking {booking.booking_id} already exists, updating...")
            booking.booking_date = booking_date
            booking.save()

        # 2. Create the Passenger
        # "MR IMTIYAZ SAIT RAZACK SAIT ( A ) 15/01/1967"
        dob = datetime.date(1967, 1, 15)
        passenger, p_created = Passenger.objects.get_or_create(
            booking=booking,
            full_name="MR IMTIYAZ SAIT RAZACK SAIT",
            defaults={
                "title": "MR",
                "first_name": "IMTIYAZ SAIT",
                "last_name": "RAZACK SAIT",
                "date_of_birth": dob,
                "other_info": "( A )"
            }
        )
        if p_created:
            self.stdout.write(self.style.SUCCESS(f"Created Passenger {passenger.full_name}"))
        else:
            self.stdout.write(f"Passenger {passenger.full_name} already exists")

        # 3. Create Flight Segments
        # Leg 1: Chennai to Muscat
        seg1_dep = timezone.make_aware(datetime.datetime(2026, 6, 23, 8, 15, 0))
        seg1_arr = timezone.make_aware(datetime.datetime(2026, 6, 23, 10, 35, 0))
        seg1, s1_created = FlightSegment.objects.update_or_create(
            booking=booking,
            sequence=1,
            defaults={
                "airline_name": "Oman Aviation",
                "airline_code": "WY",
                "flight_number": "252",
                "departure_airport_name": "Chennai Arpt",
                "departure_city": "Chennai",
                "departure_country": "India",
                "departure_terminal": "Terminal 2",
                "departure_time": seg1_dep,
                "arrival_airport_name": "Muscat Internatonal Arpt",
                "arrival_city": "Muscat",
                "arrival_country": "Oman",
                "arrival_terminal": None,
                "arrival_time": seg1_arr,
                "duration": "3h 50m",
                "duration_minutes": 230,
                "cabin_class": "Economy",
                "fare_type": "NA",
                "checkin_baggage": "30KG",
                "cabin_baggage": "7KG",
                "layover_duration": "4h 15m",
                "layover_minutes": 255,
            }
        )

        # Leg 2: Muscat to Jeddah
        seg2_dep = timezone.make_aware(datetime.datetime(2026, 6, 23, 14, 50, 0))
        seg2_arr = timezone.make_aware(datetime.datetime(2026, 6, 23, 17, 10, 0))
        seg2, s2_created = FlightSegment.objects.update_or_create(
            booking=booking,
            sequence=2,
            defaults={
                "airline_name": "Oman Aviation",
                "airline_code": "WY",
                "flight_number": "675",
                "departure_airport_name": "Muscat Internatonal Arpt",
                "departure_city": "Muscat",
                "departure_country": "Oman",
                "departure_terminal": None,
                "departure_time": seg2_dep,
                "arrival_airport_name": "Jeddah Intl",
                "arrival_city": "Jeddah",
                "arrival_country": "Saudi Arabia",
                "arrival_terminal": "Terminal 1",
                "arrival_time": seg2_arr,
                "duration": "3h 20m",
                "duration_minutes": 200,
                "cabin_class": "Economy",
                "fare_type": "NA",
                "checkin_baggage": "30KG",
                "cabin_baggage": "7KG",
                "layover_duration": None,
                "layover_minutes": None,
            }
        )

        # Leg 3: Jeddah to Muscat
        seg3_dep = timezone.make_aware(datetime.datetime(2026, 9, 18, 0, 55, 0))
        seg3_arr = timezone.make_aware(datetime.datetime(2026, 9, 18, 5, 10, 0))
        seg3, s3_created = FlightSegment.objects.update_or_create(
            booking=booking,
            sequence=3,
            defaults={
                "airline_name": "Oman Aviation",
                "airline_code": "WY",
                "flight_number": "674",
                "departure_airport_name": "Jeddah Intl",
                "departure_city": "Jeddah",
                "departure_country": "Saudi Arabia",
                "departure_terminal": "Terminal 1",
                "departure_time": seg3_dep,
                "arrival_airport_name": "Muscat Internatonal Arpt",
                "arrival_city": "Muscat",
                "arrival_country": "Oman",
                "arrival_terminal": None,
                "arrival_time": seg3_arr,
                "duration": "3h 15m",
                "duration_minutes": 195,
                "cabin_class": "Economy",
                "fare_type": "NA",
                "checkin_baggage": "30KG",
                "cabin_baggage": "7KG",
                "layover_duration": "4h 10m",
                "layover_minutes": 250,
            }
        )

        # Leg 4: Muscat to Chennai
        seg4_dep = timezone.make_aware(datetime.datetime(2026, 9, 18, 9, 20, 0))
        seg4_arr = timezone.make_aware(datetime.datetime(2026, 9, 18, 14, 40, 0))
        seg4, s4_created = FlightSegment.objects.update_or_create(
            booking=booking,
            sequence=4,
            defaults={
                "airline_name": "Oman Aviation",
                "airline_code": "WY",
                "flight_number": "253",
                "departure_airport_name": "Muscat Internatonal Arpt",
                "departure_city": "Muscat",
                "departure_country": "Oman",
                "departure_terminal": None,
                "departure_time": seg4_dep,
                "arrival_airport_name": "Chennai Arpt",
                "arrival_city": "Chennai",
                "arrival_country": "India",
                "arrival_terminal": "Terminal 2",
                "arrival_time": seg4_arr,
                "duration": "3h 50m",
                "duration_minutes": 230,
                "cabin_class": "Economy",
                "fare_type": "NA",
                "checkin_baggage": "30KG",
                "cabin_baggage": "7KG",
                "layover_duration": None,
                "layover_minutes": None,
            }
        )

        self.stdout.write(self.style.SUCCESS("Flight segments populated / updated successfully"))

        # 4. Associate passenger and segments with their specific PNR
        pnr_code = "ONFDOJ"
        
        for idx, seg in enumerate([seg1, seg2, seg3, seg4], start=1):
            detail, d_created = PassengerSegmentDetail.objects.update_or_create(
                passenger=passenger,
                segment=seg,
                defaults={
                    "pnr": pnr_code,
                    "ticket_number": None,
                    "seat_number": None,
                    "meal_preference": None,
                    "baggage_preference": None,
                    "seat_preference": None,
                    "other_preference": None
                }
            )
            if d_created:
                self.stdout.write(self.style.SUCCESS(f"Associated segment {idx} with PNR {pnr_code}"))
            else:
                self.stdout.write(f"Updated PNR association for segment {idx}")

        self.stdout.write(self.style.SUCCESS("All sample data successfully loaded!"))
