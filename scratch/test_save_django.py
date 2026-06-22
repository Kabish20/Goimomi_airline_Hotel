import os
import django
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'airticket_project.settings')
django.setup()

from django.utils.dateparse import parse_datetime, parse_date
from tickets.models import Booking, Passenger, FlightSegment, PassengerSegmentDetail
from django.utils import timezone

data = {
  "booking_id": "TJ1189178071008",
  "booking_date": "2026-06-18T18:27:00.000Z",
  "segments": [
    {
      "sequence": 1,
      "airline_name": "Oman Aviation",
      "airline_code": "WY",
      "flight_number": "252",
      "airline_logo": "oman-air-logo-circular.png",
      "departure_city": "Chennai",
      "departure_country": "India",
      "departure_airport_name": "Chennai Arpt",
      "departure_terminal": "Terminal 2",
      "departure_time": "2026-06-23T08:15:00.000Z",
      "arrival_city": "Muscat",
      "arrival_country": "Oman",
      "arrival_airport_name": "Muscat Internatonal Arpt",
      "arrival_terminal": None,
      "arrival_time": "2026-06-23T10:35:00.000Z",
      "duration": "3h 50m",
      "cabin_class": "Economy",
      "fare_type": "NA",
      "checkin_baggage": "30KG",
      "cabin_baggage": "7KG",
      "layover_duration": "4h 15m"
    }
  ],
  "passengers": [
    {
      "full_name": "MR IMTIYAZ SAIT RAZACK SAIT",
      "title": "MR",
      "date_of_birth": "1967-01-15",
      "other_info": "( A )"
    }
  ]
}

try:
    booking_id = data.get('booking_id')
    booking_date_str = data.get('booking_date')
    booking_date = parse_datetime(booking_date_str)
    
    booking, created = Booking.objects.update_or_create(
        booking_id=booking_id,
        defaults={"booking_date": booking_date or timezone.now()}
    )
    
    # Clear existing passengers & segments to avoid orphans
    booking.passengers.all().delete()
    booking.segments.all().delete()
    
    # Save passengers
    passengers_list = data.get('passengers', [])
    saved_passengers = []
    for p_data in passengers_list:
        dob_str = p_data.get('date_of_birth')
        dob = parse_date(dob_str) if dob_str else None
        
        p = Passenger.objects.create(
            booking=booking,
            full_name=p_data.get('full_name', ''),
            title=p_data.get('title', 'MR'),
            date_of_birth=dob,
            other_info=p_data.get('other_info', '')
        )
        saved_passengers.append(p)
        
    # Save segments
    segments_list = data.get('segments', [])
    saved_segments = []
    for s_data in segments_list:
        dep_time_str = s_data.get('departure_time')
        dep_time = parse_datetime(dep_time_str) if dep_time_str else timezone.now()
        
        arr_time_str = s_data.get('arrival_time')
        arr_time = parse_datetime(arr_time_str) if arr_time_str else timezone.now()
        
        seg = FlightSegment.objects.create(
            booking=booking,
            sequence=s_data.get('sequence', 1),
            airline_name=s_data.get('airline_name', 'Oman Aviation'),
            airline_code=s_data.get('airline_code', 'WY'),
            flight_number=s_data.get('flight_number', ''),
            airline_logo=s_data.get('airline_logo', 'oman-air-logo-circular.png'),
            departure_airport_name=s_data.get('departure_airport_name', ''),
            departure_city=s_data.get('departure_city', ''),
            departure_country=s_data.get('departure_country', ''),
            departure_terminal=s_data.get('departure_terminal'),
            departure_time=dep_time,
            arrival_airport_name=s_data.get('arrival_airport_name', ''),
            arrival_city=s_data.get('arrival_city', ''),
            arrival_country=s_data.get('arrival_country', ''),
            arrival_terminal=s_data.get('arrival_terminal'),
            arrival_time=arr_time,
            duration=s_data.get('duration', ''),
            cabin_class=s_data.get('cabin_class', 'Economy'),
            fare_type=s_data.get('fare_type', 'NA'),
            checkin_baggage=s_data.get('checkin_baggage', '30KG'),
            cabin_baggage=s_data.get('cabin_baggage', '7KG'),
            layover_duration=s_data.get('layover_duration')
        )
        saved_segments.append(seg)
        
    # Recreate passenger segment details
    for p in saved_passengers:
        for seg in saved_segments:
            PassengerSegmentDetail.objects.create(
                passenger=p,
                segment=seg,
                pnr="ONFDOJ",
                ticket_number=""
            )
            
    print("SUCCESS: Saved booking", booking_id)
except Exception as e:
    import traceback
    traceback.print_exc()
