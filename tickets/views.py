from django.http import JsonResponse
from django.views.decorators.http import require_GET
from .models import Booking

@require_GET
def get_booking_details(request, booking_id):
    try:
        booking = Booking.objects.prefetch_related(
            'passengers', 'segments', 'passengers__segment_details', 'passengers__segment_details__segment'
        ).get(booking_id=booking_id)
    except Booking.DoesNotExist:
        return JsonResponse({"error": "Booking not found"}, status=404)

    # Serialize segments
    segments_data = []
    for seg in booking.segments.all():
        segments_data.append({
            "sequence": seg.sequence,
            "airline": f"{seg.airline_name} ({seg.airline_code}-{seg.flight_number})",
            "airline_name": seg.airline_name,
            "airline_code": seg.airline_code,
            "airline_logo": seg.airline_logo,
            "flight_number": seg.flight_number,
            "departure": {
                "city": seg.departure_city,
                "country": seg.departure_country,
                "airport": seg.departure_airport_name,
                "terminal": seg.departure_terminal,
                "time": seg.departure_time.isoformat()
            },
            "arrival": {
                "city": seg.arrival_city,
                "country": seg.arrival_country,
                "airport": seg.arrival_airport_name,
                "terminal": seg.arrival_terminal,
                "time": seg.arrival_time.isoformat()
            },
            "duration": seg.duration,
            "duration_minutes": seg.duration_minutes,
            "cabin_class": seg.cabin_class,
            "fare_type": seg.fare_type,
            "baggage": {
                "check_in": seg.checkin_baggage,
                "cabin": seg.cabin_baggage
            },
            "layover": {
                "duration": seg.layover_duration,
                "minutes": seg.layover_minutes
            } if seg.layover_duration else None
        })

    # Serialize passengers
    passengers_data = []
    for passenger in booking.passengers.all():
        # Get segment-specific PNRs and preferences for this passenger
        segment_details = []
        for detail in passenger.segment_details.all():
            segment_details.append({
                "segment_sequence": detail.segment.sequence,
                "route": f"{detail.segment.departure_city} to {detail.segment.arrival_city}",
                "pnr": detail.pnr,
                "ticket_number": detail.ticket_number,
                "seat_number": detail.seat_number,
                "preferences": {
                    "meal": detail.meal_preference,
                    "baggage": detail.baggage_preference,
                    "seat": detail.seat_preference,
                    "other": detail.other_preference
                }
            })
            
        passengers_data.append({
            "full_name": passenger.full_name,
            "title": passenger.title,
            "first_name": passenger.first_name,
            "last_name": passenger.last_name,
            "date_of_birth": passenger.date_of_birth.strftime('%Y-%m-%d') if passenger.date_of_birth else None,
            "passport_number": passenger.passport_number,
            "frequent_flyer_number": passenger.frequent_flyer_number,
            "other_info": passenger.other_info,
            "segment_specific_details": segment_details
        })

    response_data = {
        "booking_id": booking.booking_id,
        "booking_date": booking.booking_date.isoformat(),
        "created_at": booking.created_at.isoformat(),
        "updated_at": booking.updated_at.isoformat(),
        "segments": segments_data,
        "passengers": passengers_data
    }

    return JsonResponse(response_data, safe=False)


from django.views.decorators.csrf import csrf_exempt
import json
from django.utils.dateparse import parse_datetime, parse_date
from .models import Passenger, FlightSegment, PassengerSegmentDetail

@csrf_exempt
def save_booking_details(request):
    if request.method != 'POST':
        return JsonResponse({"error": "Only POST allowed"}, status=405)
    try:
        data = json.loads(request.body)
        booking_id = data.get('booking_id')
        if not booking_id:
            return JsonResponse({"error": "Booking ID required"}, status=400)
            
        booking_date_str = data.get('booking_date')
        booking_date = parse_datetime(booking_date_str)
        if not booking_date and booking_date_str:
            if 'T' in booking_date_str and len(booking_date_str) == 16:
                booking_date = parse_datetime(booking_date_str + ':00')
            else:
                booking_date = parse_datetime(booking_date_str)
                
        if not booking_date:
            from django.utils import timezone
            booking_date = timezone.now()
            
        # Create or update Booking
        booking, created = Booking.objects.update_or_create(
            booking_id=booking_id,
            defaults={"booking_date": booking_date}
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
            dep_time = parse_datetime(dep_time_str) if dep_time_str else None
            if not dep_time and dep_time_str:
                if 'T' in dep_time_str and len(dep_time_str) == 16:
                    dep_time = parse_datetime(dep_time_str + ':00')
                    
            arr_time_str = s_data.get('arrival_time')
            arr_time = parse_datetime(arr_time_str) if arr_time_str else None
            if not arr_time and arr_time_str:
                if 'T' in arr_time_str and len(arr_time_str) == 16:
                    arr_time = parse_datetime(arr_time_str + ':00')
            
            # Use now fallback if invalid
            if not dep_time:
                from django.utils import timezone
                dep_time = timezone.now()
            if not arr_time:
                from django.utils import timezone
                arr_time = timezone.now()
                
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
            
        # Recreate passenger segment details (PNR config)
        for p in saved_passengers:
            for seg in saved_segments:
                PassengerSegmentDetail.objects.create(
                    passenger=p,
                    segment=seg,
                    pnr="ONFDOJ",
                    ticket_number=""
                )
                
        return JsonResponse({"success": True, "booking_id": booking.booking_id})
    except Exception as e:
        import traceback
        traceback.print_exc()
        return JsonResponse({"error": str(e)}, status=500)


import re

def parse_flight_date(date_str, year):
    # E.g., "Jun 25, Thu, 09:35" -> "2026-06-25T09:35:00.000Z"
    months = {
        "jan": "01", "feb": "02", "mar": "03", "apr": "04", "may": "05", "jun": "06",
        "jul": "07", "aug": "08", "sep": "09", "oct": "10", "nov": "11", "dec": "12"
    }
    match = re.search(r'([A-Za-z]{3})\s+(\d{1,2}).*?(\d{2})[:\s](\d{2})', date_str)
    if match:
        mon_str, day_str, hr, mn = match.groups()
        mon = months.get(mon_str.lower(), "01")
        day = day_str.zfill(2)
        return f"{year}-{mon}-{day}T{hr}:{mn}:00.000Z"
    return None

def parse_ocr_text(text):
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    
    # Try to find a year
    year_match = re.search(r'\b(20\d{2})\b', text)
    year = year_match.group(1) if year_match else "2026"
    
    # Predefined lists from the frontend React app
    AIRLINE_MAPPING = {
        "WY": ("Oman Air", "oman-air-logo-circular.png"),
        "3L": ("Air Arabia Abu Dhabi", "air-arabia-abu-dhabi-logo-circular.png"),
        "G9": ("Air Arabia", "air-arabia-abu-dhabi-logo-circular.png"),
        "IX": ("Air India Express", "air-india-express-logo-circular.png"),
        "AI": ("Air India Express", "air-india-express-logo-circular.png"),
        "AK": ("AirAsia", "airasia-logo-circular.png"),
        "QP": ("Akasa Air", "akasa-air-logo-circular.png"),
        "BA": ("British Airways", "british-airways-logo-circular.png"),
        "MS": ("EgyptAir", "egyptair-logo-circular.png"),
        "EK": ("Emirates", "emirates-logo-circular.png"),
        "FZ": ("flydubai", "flydubai-logo-circular.png"),
        "6E": ("IndiGo", "indigo-logo-circular.png"),
        "QZ": ("Indonesia AirAsia", "indonesia-airasia-logo-circular.png"),
        "KU": ("Kuwait Airways", "kuwait-airways-logo-circular.png"),
        "JT": ("Lion Air", "lion-air-logo-circular.png"),
        "LH": ("Lufthansa", "lufthansa-logo-circular.png"),
        "MH": ("Malaysia Airlines", "malaysia-airlines-logo-circular.png"),
        "QR": ("Qatar Airways", "qatar-airways-logo-circular.png"),
        "OV": ("SalamAir", "salamair-logo-circular.png"),
        "SV": ("Saudia", "saudia-logo-circular.png"),
        "TR": ("Scoot", "scoot-logo-circular.png"),
        "SQ": ("Singapore Airlines", "singapore-airlines-logo-circular.png")
    }
    
    # 1. Booking Info parsing
    booking_id = None
    for i, line in enumerate(lines):
        clean_line = line.lower().strip(':')
        if clean_line == "booking id":
            if i + 1 < len(lines):
                booking_id = lines[i+1]
                break
    if not booking_id:
        match = re.search(r'(?:Booking\s*ID|BookingID)\s*[:\-\s]*\s*([A-Z0-9]+)', text, re.IGNORECASE)
        if match:
            booking_id = match.group(1)
    if booking_id:
        booking_id = booking_id.strip()
            
    booking_date = None
    for i, line in enumerate(lines):
        clean_line = line.lower().strip(':')
        if clean_line in ["booking date/time", "booking date", "booking datetime"]:
            if i + 1 < len(lines):
                booking_date = lines[i+1]
                break
    if not booking_date:
        match = re.search(r'(?:Booking\s*Date/Time|Date/Time|Booking\s*Date)\s*[:\-\s]*\s*(\d{2}[-/\s]\d{2}[-/\s]\d{4}\s+\d{2}[:\s]\d{2})', text, re.IGNORECASE)
        if match:
            booking_date = match.group(1)
            
    booking_date_iso = None
    if booking_date:
        date_match = re.search(r'(\d{2})[-/](\d{2})[-/](\d{4})\s+(\d{2})[:\s](\d{2})', booking_date)
        if date_match:
            dd, mm, yyyy, hr, mn = date_match.groups()
            booking_date_iso = f"{yyyy}-{mm}-{dd}T{hr}:{mn}:00.000Z"

    # Passengers
    title = None
    full_name = None
    dob = None
    other_info = None
    for i, line in enumerate(lines):
        clean_line = line.lower().strip(':')
        if clean_line == "title":
            if i + 1 < len(lines):
                title = lines[i+1]
        elif clean_line == "full name":
            if i + 1 < len(lines):
                full_name = lines[i+1]
        elif clean_line in ["date of birth", "dob"]:
            if i + 1 < len(lines):
                dob = lines[i+1]
        elif clean_line in ["identity metadata", "metadata"]:
            if i + 1 < len(lines):
                other_info = lines[i+1]
                
    if not title:
        title_match = re.search(r'Title\s*[:\-\s]*\s*([A-Za-z]+)', text, re.IGNORECASE)
        if title_match:
            title = title_match.group(1)
    if not full_name:
        name_match = re.search(r'Full\s*Name\s*[:\-\s]*\s*([A-Za-z ]+)', text, re.IGNORECASE)
        if name_match:
            full_name = name_match.group(1)
    if not dob:
        dob_match = re.search(r'(?:Date\s*of\s*Birth|DOB)\s*[:\-\s]*\s*(\d{2}[-/\s]\d{2}[-/\s]\d{4})', text, re.IGNORECASE)
        if dob_match:
            dob = dob_match.group(1)
    if not other_info:
        meta_match = re.search(r'(?:Identity\s*Metadata|Metadata)\s*[:\-\s]*\s*(\([^)]+\)|[A-Za-z0-9()]+)', text, re.IGNORECASE)
        if meta_match:
            other_info = meta_match.group(1)

    dob_iso = None
    if dob:
        dob_match_clean = re.search(r'(\d{2})[-/](\d{2})[-/](\d{4})', dob)
        if dob_match_clean:
            dd, mm, yyyy = dob_match_clean.groups()
            dob_iso = f"{yyyy}-{mm}-{dd}"
            
    passengers = []
    if full_name:
        passengers.append({
            "full_name": full_name.strip().upper(),
            "title": title.strip().upper() if title else "MR",
            "date_of_birth": dob_iso,
            "other_info": other_info.strip() if other_info else ""
        })

    # 2. Flight Segments parsing
    # Find all flight lines (start of departures)
    flight_lines = []
    for i, line in enumerate(lines):
        match = re.search(r'\b([A-Z0-9]{2})[- ]*\s*([0-9]{3,4})\b', line)
        if match:
            flight_lines.append((i, match.group(1), match.group(2)))
            
    departures = []
    months_pattern = r'(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)'
    
    for idx, (f_idx, carrier, num) in enumerate(flight_lines):
        dep_date_line = None
        dep_date_idx = -1
        next_boundary = flight_lines[idx+1][0] if idx+1 < len(flight_lines) else len(lines)
        
        for k in range(f_idx + 1, next_boundary):
            if re.search(months_pattern + r'\s+\d{1,2}.*\d{2}:\d{2}', lines[k], re.IGNORECASE):
                dep_date_line = lines[k]
                dep_date_idx = k
                break
                
        if not dep_date_line:
            continue
            
        dep_city = ""
        dep_country = ""
        if dep_date_idx + 1 < next_boundary:
            city_line = lines[dep_date_idx + 1]
            if "," in city_line:
                parts = city_line.split(",")
                dep_city = parts[0].strip()
                dep_country = parts[1].strip()
            else:
                dep_city = city_line
                
        dep_airport = ""
        if dep_date_idx + 2 < next_boundary:
            dep_airport = lines[dep_date_idx + 2]
            
        dep_terminal = ""
        for m in range(dep_date_idx + 2, next_boundary):
            chk_line = lines[m]
            if "terminal" in chk_line.lower():
                term_match = re.search(r'Terminal\s*\d+', chk_line, re.IGNORECASE)
                dep_terminal = term_match.group(0) if term_match else chk_line
                break
                
        departures.append({
            "carrier": carrier,
            "flight_number": num,
            "departure_city": dep_city,
            "departure_country": dep_country,
            "departure_airport": dep_airport,
            "departure_terminal": dep_terminal,
            "departure_time": parse_flight_date(dep_date_line, year)
        })

    duration_lines = []
    for i, line in enumerate(lines):
        if re.search(r'\b\d+h\s+\d+m\b', line) and not "layover" in line.lower():
            duration_lines.append(i)
            
    arrivals = []
    for idx, d_idx in enumerate(duration_lines):
        duration_line = lines[d_idx]
        duration = re.search(r'\b\d+h\s+\d+m\b', duration_line).group(0)
        
        arr_date_line = None
        arr_date_idx = -1
        next_boundary = duration_lines[idx+1] if idx+1 < len(duration_lines) else len(lines)
        
        for k in range(d_idx + 1, next_boundary):
            if re.search(months_pattern + r'\s+\d{1,2}.*\d{2}:\d{2}', lines[k], re.IGNORECASE):
                arr_date_line = lines[k]
                arr_date_idx = k
                break
                
        if not arr_date_line:
            continue
            
        arr_city = ""
        arr_country = ""
        if arr_date_idx + 1 < next_boundary:
            city_line = lines[arr_date_idx + 1]
            if "," in city_line:
                parts = city_line.split(",")
                arr_city = parts[0].strip()
                arr_country = parts[1].strip()
            else:
                arr_city = city_line
                
        arr_airport_parts = []
        arr_terminal = ""
        for m in range(arr_date_idx + 2, next_boundary):
            chk_line = lines[m]
            if "terminal" in chk_line.lower():
                term_match = re.search(r'Terminal\s*\d+', chk_line, re.IGNORECASE)
                arr_terminal = term_match.group(0) if term_match else chk_line
                break
            elif "layover" in chk_line.lower() or "change plane" in chk_line.lower():
                break
            else:
                arr_airport_parts.append(chk_line)
        arr_airport = " ".join(arr_airport_parts).strip()
        
        layover = None
        for m in range(arr_date_idx + 2, next_boundary):
            chk_line = lines[m]
            if "layover" in chk_line.lower():
                lay_match = re.search(r'\b\d+h\s+\d+m\b', chk_line)
                if lay_match:
                    layover = lay_match.group(0)
                    break
                    
        arrivals.append({
            "duration": duration,
            "arrival_city": arr_city,
            "arrival_country": arr_country,
            "arrival_airport": arr_airport,
            "arrival_terminal": arr_terminal,
            "arrival_time": parse_flight_date(arr_date_line, year),
            "layover_duration": layover
        })

    segments = []
    for idx in range(max(len(departures), len(arrivals))):
        dep = departures[idx] if idx < len(departures) else {}
        arr = arrivals[idx] if idx < len(arrivals) else {}
        
        carrier = dep.get("carrier", "WY")
        airline_name, airline_logo = AIRLINE_MAPPING.get(carrier, ("Oman Aviation", "oman-air-logo-circular.png"))
        
        segments.append({
            "sequence": idx + 1,
            "airline_name": airline_name,
            "airline_code": carrier,
            "flight_number": dep.get("flight_number", ""),
            "airline_logo": airline_logo,
            "departure_city": dep.get("departure_city", ""),
            "departure_country": dep.get("departure_country", ""),
            "departure_airport_name": dep.get("departure_airport", ""),
            "departure_terminal": dep.get("departure_terminal", ""),
            "departure_time": dep.get("departure_time"),
            "arrival_city": arr.get("arrival_city", ""),
            "arrival_country": arr.get("arrival_country", ""),
            "arrival_airport_name": arr.get("arrival_airport", ""),
            "arrival_terminal": arr.get("arrival_terminal", ""),
            "arrival_time": arr.get("arrival_time"),
            "duration": arr.get("duration", ""),
            "cabin_class": "Economy",
            "fare_type": "NA",
            "checkin_baggage": "30KG",
            "cabin_baggage": "7KG",
            "layover_duration": arr.get("layover_duration")
        })
        
    airline_logo = "oman-air-logo-circular.png"
    if segments:
        airline_logo = segments[0]["airline_logo"]

    return {
        "booking_id": booking_id,
        "booking_date": booking_date_iso,
        "airline_logo": airline_logo,
        "passengers": passengers,
        "segments": segments
    }


@csrf_exempt
def upload_screenshot(request):
    if request.method != 'POST':
        return JsonResponse({"error": "Only POST allowed"}, status=405)
    if 'screenshot' not in request.FILES:
        return JsonResponse({"error": "No screenshot file found in request"}, status=400)
    image_file = request.FILES['screenshot']
    text = ""
    ocr_source = "None"
    
    # Check file extension or mime type for PDF
    filename = image_file.name.lower() if image_file.name else ""
    is_pdf = filename.endswith('.pdf') or image_file.content_type == 'application/pdf'
    
    # 1. If PDF, try extracting text offline using pdfplumber
    if is_pdf:
        try:
            import pdfplumber
            image_file.seek(0)
            with pdfplumber.open(image_file) as pdf:
                pdf_text = ""
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        pdf_text += page_text + "\n"
                if pdf_text.strip():
                    text = pdf_text
                    ocr_source = "pdfplumber"
        except Exception as e:
            print(f"pdfplumber extraction failed: {e}")

    # 2. Try pytesseract first (only for images)
    if not text.strip() and not is_pdf:
        try:
            from PIL import Image
            import pytesseract
            import os
            import subprocess
            
            # Check if tesseract is in PATH; if not, configure standard Windows paths
            tesseract_executable = 'tesseract'
            try:
                subprocess.run([tesseract_executable, '--version'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            except FileNotFoundError:
                common_paths = [
                    r"C:\Program Files\Tesseract-OCR\tesseract.exe",
                    r"C:\Program Files (x86)\Tesseract-OCR\tesseract.exe",
                ]
                user_profile = os.environ.get('USERPROFILE')
                if user_profile:
                    common_paths.append(os.path.join(user_profile, r"AppData\Local\Programs\Tesseract-OCR\tesseract.exe"))
                    common_paths.append(os.path.join(user_profile, r"AppData\Local\Tesseract-OCR\tesseract.exe"))
                
                for path in common_paths:
                    if os.path.exists(path):
                        pytesseract.pytesseract.tesseract_cmd = path
                        break
            
            image_file.seek(0)
            img = Image.open(image_file)
            text = pytesseract.image_to_string(img)
            if text.strip():
                ocr_source = "pytesseract"
        except Exception as e:
            print(f"pytesseract failed: {e}")

    # 3. Fall back to OCR.space API (works for both images and PDFs)
    if not text.strip():
        try:
            import requests
            image_file.seek(0)
            payload = {
                'apikey': 'helloworld',
                'language': 'eng',
                'OCREngine': '2',
            }
            files = {'file': (image_file.name, image_file.read(), image_file.content_type)}
            response = requests.post('https://api.ocr.space/parse/image', files=files, data=payload, timeout=15)
            if response.status_code == 200:
                result = response.json()
                if not result.get('IsErroredOnProcessing', False):
                    parsed_results = result.get('ParsedResults', [])
                    if parsed_results:
                        text = parsed_results[0].get('ParsedText', '')
                        ocr_source = "ocr.space"
                else:
                    print(f"ocr.space error: {result.get('ErrorMessage')}")
            else:
                print(f"ocr.space response code: {response.status_code}")
        except Exception as e:
            print(f"ocr.space fallback failed: {e}")

    if not text.strip():
        return JsonResponse({"error": "Failed to extract text from file. Make sure it's a readable PDF, Tesseract is installed locally, or you have an internet connection."}, status=500)
    
    parsed_data = parse_ocr_text(text)
    return JsonResponse({
        "success": True,
        "ocr_source": ocr_source,
        "raw_text": text,
        "data": parsed_data
    })
