import requests
import json

payload = {
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
    response = requests.post("http://127.0.0.1:8000/api/booking/save/", json=payload)
    print("Status Code:", response.status_code)
    print("Response JSON:", response.json())
except Exception as e:
    print("Error:", e)
