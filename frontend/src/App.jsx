import React, { useState, useEffect } from 'react';
import PrintableTicket from './components/PrintableTicket';
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  const hostname = window.location.hostname;
  if (hostname.endsWith('.onrender.com')) {
    return 'https://goimomi-airline-hotel-23tj.onrender.com';
  }
  return 'http://127.0.0.1:8080';
};

const API_BASE_URL = getApiBaseUrl();
// Complete mock dataset for robust offline fallback
const AIRLINE_LOGOS = [
  { value: "oman-air-logo-circular.png", label: "Oman Air" },
  { value: "air-arabia-abu-dhabi-logo-circular.png", label: "Air Arabia Abu Dhabi" },
  { value: "air-india-express-logo-circular.png", label: "Air India Express" },
  { value: "airasia-logo-circular.png", label: "AirAsia" },
  { value: "akasa-air-logo-circular.png", label: "Akasa Air" },
  { value: "british-airways-logo-circular.png", label: "British Airways" },
  { value: "egyptair-logo-circular.png", label: "EgyptAir" },
  { value: "emirates-logo-circular.png", label: "Emirates" },
  { value: "flydubai-logo-circular.png", label: "flydubai" },
  { value: "indigo-logo-circular.png", label: "IndiGo" },
  { value: "indonesia-airasia-logo-circular.png", label: "Indonesia AirAsia" },
  { value: "kuwait-airways-logo-circular.png", label: "Kuwait Airways" },
  { value: "lion-air-logo-circular.png", label: "Lion Air" },
  { value: "lufthansa-logo-circular.png", label: "Lufthansa" },
  { value: "malaysia-airlines-logo-circular.png", label: "Malaysia Airlines" },
  { value: "qatar-airways-logo-circular.png", label: "Qatar Airways" },
  { value: "salamair-logo-circular.png", label: "SalamAir" },
  { value: "saudia-logo-circular.png", label: "Saudia" },
  { value: "scoot-logo-circular.png", label: "Scoot" },
  { value: "singapore-airlines-logo-circular.png", label: "Singapore Airlines" }
];

const AIRLINE_MAPPING = {
  "oman-air-logo-circular.png": { name: "Oman Air", code: "WY" },
  "air-arabia-abu-dhabi-logo-circular.png": { name: "Air Arabia Abu Dhabi", code: "3L" },
  "air-india-express-logo-circular.png": { name: "Air India Express", code: "IX" },
  "airasia-logo-circular.png": { name: "AirAsia", code: "AK" },
  "akasa-air-logo-circular.png": { name: "Akasa Air", code: "QP" },
  "british-airways-logo-circular.png": { name: "British Airways", code: "BA" },
  "egyptair-logo-circular.png": { name: "EgyptAir", code: "MS" },
  "emirates-logo-circular.png": { name: "Emirates", code: "EK" },
  "flydubai-logo-circular.png": { name: "flydubai", code: "FZ" },
  "indigo-logo-circular.png": { name: "IndiGo", code: "6E" },
  "indonesia-airasia-logo-circular.png": { name: "Indonesia AirAsia", code: "QZ" },
  "kuwait-airways-logo-circular.png": { name: "Kuwait Airways", code: "KU" },
  "lion-air-logo-circular.png": { name: "Lion Air", code: "JT" },
  "lufthansa-logo-circular.png": { name: "Lufthansa", code: "LH" },
  "malaysia-airlines-logo-circular.png": { name: "Malaysia Airlines", code: "MH" },
  "qatar-airways-logo-circular.png": { name: "Qatar Airways", code: "QR" },
  "salamair-logo-circular.png": { name: "SalamAir", code: "OV" },
  "saudia-logo-circular.png": { name: "Saudia", code: "SV" },
  "scoot-logo-circular.png": { name: "Scoot", code: "TR" },
  "singapore-airlines-logo-circular.png": { name: "Singapore Airlines", code: "SQ" }
};

const INITIAL_MOCK_DATA = {
  "booking_id": "TJ1189178071008",
  "booking_date": "2026-06-18T18:27:00.000Z",
  "segments": [
    {
      "sequence": 1,
      "pnr": "ONFDOJ",
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
      "arrival_terminal": null,
      "arrival_time": "2026-06-23T10:35:00.000Z",
      "duration": "3h 50m",
      "cabin_class": "Economy",
      "fare_type": "NA",
      "checkin_baggage": "30KG",
      "cabin_baggage": "7KG",
      "layover_duration": "4h 15m",
      "is_active": true
    },
    {
      "sequence": 2,
      "pnr": "ONFDOJ",
      "airline_name": "Oman Aviation",
      "airline_code": "WY",
      "flight_number": "675",
      "airline_logo": "oman-air-logo-circular.png",
      "departure_city": "Muscat",
      "departure_country": "Oman",
      "departure_airport_name": "Muscat Internatonal Arpt",
      "departure_terminal": null,
      "departure_time": "2026-06-23T14:50:00.000Z",
      "arrival_city": "Jeddah",
      "arrival_country": "Saudi Arabia",
      "arrival_airport_name": "Jeddah Intl",
      "arrival_terminal": "Terminal 1",
      "arrival_time": "2026-06-23T17:10:00.000Z",
      "duration": "3h 20m",
      "cabin_class": "Economy",
      "fare_type": "NA",
      "checkin_baggage": "30KG",
      "cabin_baggage": "7KG",
      "layover_duration": null,
      "is_active": true
    },
    {
      "sequence": 3,
      "pnr": "ONFDOJ",
      "airline_name": "Oman Aviation",
      "airline_code": "WY",
      "flight_number": "674",
      "airline_logo": "oman-air-logo-circular.png",
      "departure_city": "Jeddah",
      "departure_country": "Saudi Arabia",
      "departure_airport_name": "Jeddah Intl",
      "departure_terminal": "Terminal 1",
      "departure_time": "2026-09-18T00:55:00.000Z",
      "arrival_city": "Muscat",
      "arrival_country": "Oman",
      "arrival_airport_name": "Muscat Internatonal Arpt",
      "arrival_terminal": null,
      "arrival_time": "2026-09-18T05:10:00.000Z",
      "duration": "3h 15m",
      "cabin_class": "Economy",
      "fare_type": "NA",
      "checkin_baggage": "30KG",
      "cabin_baggage": "7KG",
      "layover_duration": "4h 10m",
      "is_active": true
    },
    {
      "sequence": 4,
      "pnr": "ONFDOJ",
      "airline_name": "Oman Aviation",
      "airline_code": "WY",
      "flight_number": "253",
      "airline_logo": "oman-air-logo-circular.png",
      "departure_city": "Muscat",
      "departure_country": "Oman",
      "departure_airport_name": "Muscat Internatonal Arpt",
      "departure_terminal": null,
      "departure_time": "2026-09-18T09:20:00.000Z",
      "arrival_city": "Chennai",
      "arrival_country": "India",
      "arrival_airport_name": "Chennai Arpt",
      "departure_terminal": "Terminal 2",
      "arrival_time": "2026-09-18T14:40:00.000Z",
      "duration": "3h 50m",
      "cabin_class": "Economy",
      "fare_type": "NA",
      "checkin_baggage": "30KG",
      "cabin_baggage": "7KG",
      "layover_duration": null,
      "is_active": true
    }
  ],
  "passengers": [
    {
      "full_name": "MR IMTIYAZ SAIT RAZACK SAIT",
      "title": "MR",
      "first_name": "IMTIYAZ SAIT",
      "last_name": "RAZACK SAIT",
      "date_of_birth": "1967-01-15",
      "passport_number": "",
      "frequent_flyer_number": "",
      "other_info": "( A )"
    }
  ]
};

function App() {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFormTab, setActiveFormTab] = useState('general'); // 'general', 'outbound', 'return'
  const [dataSource, setDataSource] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState('');

  const [ocrUploading, setOcrUploading] = useState(false);
  const [ocrError, setOcrError] = useState(null);
  const [ocrSuccess, setOcrSuccess] = useState(false);
  const [highlightedFields, setHighlightedFields] = useState({});

  const handleOcrUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setOcrUploading(true);
    setOcrError(null);
    setOcrSuccess(false);
    setHighlightedFields({});

    const formData = new FormData();
    formData.append('screenshot', file);

    fetch(`${API_BASE_URL}/api/booking/upload-screenshot/`, {
      method: 'POST',
      body: formData,
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(errData => {
            throw new Error(errData.error || "Failed to process ticket file");
          });
        }
        return res.json();
      })
      .then(resData => {
        if (resData.success && resData.data) {
          const extracted = resData.data;

          setBooking(prev => {
            const updated = { ...prev };
            const newHighlights = {};

            if (extracted.booking_id) {
              updated.booking_id = extracted.booking_id;
              newHighlights.booking_id = true;
            }
            if (extracted.booking_date) {
              updated.booking_date = extracted.booking_date;
              newHighlights.booking_date = true;
            }
            if (extracted.airline_logo) {
              const logo = extracted.airline_logo;
              const mapping = AIRLINE_MAPPING[logo] || { name: 'Oman Air', code: 'WY' };
              updated.segments = updated.segments.map(seg => ({
                ...seg,
                airline_logo: logo,
                airline_name: mapping.name,
                airline_code: mapping.code
              }));
              newHighlights.airline = true;
            }

            if (extracted.passengers && extracted.passengers.length > 0) {
              const ocrP = extracted.passengers[0];

              if (updated.passengers.length === 0) {
                updated.passengers = [{
                  full_name: ocrP.full_name || '',
                  title: ocrP.title || 'MR',
                  date_of_birth: ocrP.date_of_birth || '',
                  other_info: ocrP.other_info || ''
                }];
              } else {
                updated.passengers = updated.passengers.map((p, idx) => {
                  if (idx === 0) {
                    return {
                      ...p,
                      full_name: ocrP.full_name || p.full_name,
                      title: ocrP.title || p.title,
                      date_of_birth: ocrP.date_of_birth || p.date_of_birth,
                      other_info: ocrP.other_info || p.other_info
                    };
                  }
                  return p;
                });
              }
              newHighlights.passenger = true;
            }

            if (extracted.segments && extracted.segments.length > 0) {
              updated.segments = updated.segments.map((seg, idx) => {
                const ocrSeg = extracted.segments[idx];
                if (ocrSeg) {
                  return {
                    ...seg,
                    airline_name: ocrSeg.airline_name || seg.airline_name,
                    airline_code: ocrSeg.airline_code || seg.airline_code,
                    flight_number: ocrSeg.flight_number || seg.flight_number,
                    airline_logo: ocrSeg.airline_logo || seg.airline_logo,
                    departure_city: ocrSeg.departure_city || seg.departure_city,
                    departure_country: ocrSeg.departure_country || seg.departure_country,
                    departure_airport_name: ocrSeg.departure_airport_name || seg.departure_airport_name,
                    departure_terminal: ocrSeg.departure_terminal || seg.departure_terminal,
                    departure_time: ocrSeg.departure_time || seg.departure_time,
                    arrival_city: ocrSeg.arrival_city || seg.arrival_city,
                    arrival_country: ocrSeg.arrival_country || seg.arrival_country,
                    arrival_airport_name: ocrSeg.arrival_airport_name || seg.arrival_airport_name,
                    arrival_terminal: ocrSeg.arrival_terminal || seg.arrival_terminal,
                    arrival_time: ocrSeg.arrival_time || seg.arrival_time,
                    duration: ocrSeg.duration || seg.duration,
                    layover_duration: ocrSeg.layover_duration !== undefined ? ocrSeg.layover_duration : seg.layover_duration
                  };
                }
                return seg;
              });
              newHighlights.segments = true;
            }

            setHighlightedFields(newHighlights);
            setTimeout(() => {
              setHighlightedFields({});
            }, 4000);

            return updated;
          });

          setOcrSuccess(true);
        } else {
          throw new Error("No data could be extracted from this file.");
        }
      })
      .catch(err => {
        console.error("OCR upload error:", err);
        setOcrError(err.message || "Failed to process ticket file");
      })
      .finally(() => {
        setOcrUploading(false);
        e.target.value = '';
      });
  };

  useEffect(() => {
    if (booking && booking.booking_id) {
      document.title = `Airticket Creator - ${booking.booking_id}`;
    } else {
      document.title = 'Airticket Creator';
    }
  }, [booking]);

  useEffect(() => {
    // Attempt to fetch from Django API first
    fetch(`${API_BASE_URL}/api/booking/TJ1189178071008/`)
      .then(res => {
        if (!res.ok) throw new Error("API server responded with error status");
        return res.json();
      })
      .then(data => {
        // Adjust formatting to match what our form uses
        const formattedData = {
          booking_id: data.booking_id,
          booking_date: data.booking_date,
          passengers: data.passengers.map(p => ({
            full_name: p.full_name,
            title: p.title || 'MR',
            date_of_birth: p.date_of_birth || '1967-01-15',
            other_info: p.other_info || '( A )'
          })),
          segments: data.segments.map(s => {
            const logo = s.airline_logo || 'oman-air-logo-circular.png';
            const mapping = AIRLINE_MAPPING[logo] || { name: 'Oman Air', code: 'WY' };
            let name = s.airline_name;
            let code = s.airline_code;
            if (logo !== 'oman-air-logo-circular.png' && (name === 'Oman Aviation' || name === 'Oman Air' || !name)) {
              name = mapping.name;
              code = mapping.code;
            }
            return {
              sequence: s.sequence,
              pnr: s.pnr || 'ONFDOJ',
              airline_name: name,
              airline_code: code,
              flight_number: s.flight_number,
              airline_logo: logo,
              departure_city: s.departure.city,
              departure_country: s.departure.country,
              departure_airport_name: s.departure.airport,
              departure_terminal: s.departure.terminal,
              departure_time: s.departure.time,
              arrival_city: s.arrival.city,
              arrival_country: s.arrival.country,
              arrival_airport_name: s.arrival.airport,
              arrival_terminal: s.arrival.terminal,
              arrival_time: s.arrival.time,
              duration: s.duration,
              cabin_class: s.cabin_class,
              fare_type: s.fare_type,
              checkin_baggage: s.baggage.check_in,
              cabin_baggage: s.baggage.cabin,
              layover_duration: s.layover ? s.layover.duration : null,
              is_active: s.is_active !== undefined ? s.is_active : true
            };
          })
        };
        setBooking(formattedData);
        setDataSource('Django Live API Database');
        setLoading(false);
      })
      .catch(err => {
        console.warn("Could not fetch from live Django API, falling back to local dataset.", err);
        setBooking(INITIAL_MOCK_DATA);
        setDataSource('Local Mock Fallback (Offline)');
        setLoading(false);
      });
  }, []);

  // Debounced auto-save trigger on booking data changes
  useEffect(() => {
    if (!booking || loading) return;

    const delayDebounceFn = setTimeout(() => {
      setAutoSaveStatus('Saving changes...');
      fetch(`${API_BASE_URL}/api/booking/save/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking),
      })
        .then(res => {
          if (!res.ok) throw new Error("Auto-save failed");
          return res.json();
        })
        .then(data => {
          setAutoSaveStatus('All changes saved to database');
          setTimeout(() => setAutoSaveStatus(''), 4000);
        })
        .catch(err => {
          console.error("Auto-save error:", err);
          setAutoSaveStatus('Auto-save failed');
        });
    }, 1200); // 1.2 second debounce to allow seamless typing

    return () => clearTimeout(delayDebounceFn);
  }, [booking, loading]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 space-y-4">
        <div className="w-10 h-10 border-4 border-slate-700 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-slate-500 font-mono">Fetching ticket details...</p>
      </div>
    );
  }

  // Handle Input Changes
  const handleBookingChange = (field, val) => {
    setBooking(prev => ({
      ...prev,
      [field]: val
    }));
  };

  const handlePassengerChange = (index, field, val) => {
    setBooking(prev => {
      const updatedP = [...prev.passengers];
      updatedP[index] = { ...updatedP[index], [field]: val };
      return { ...prev, passengers: updatedP };
    });
  };

  const addPassenger = () => {
    setBooking(prev => ({
      ...prev,
      passengers: [
        ...prev.passengers,
        {
          full_name: '',
          title: 'MR',
          date_of_birth: '',
          other_info: ''
        }
      ]
    }));
  };

  const removePassenger = (index) => {
    setBooking(prev => {
      if (prev.passengers.length <= 1) return prev;
      const updatedP = prev.passengers.filter((_, idx) => idx !== index);
      return { ...prev, passengers: updatedP };
    });
  };

  const handleSegmentChange = (sequence, field, val) => {
    setBooking(prev => {
      const updatedSegs = prev.segments.map(seg => {
        if (seg.sequence === sequence) {
          return { ...seg, [field]: val };
        }
        return seg;
      });
      return { ...prev, segments: updatedSegs };
    });
  };

  const handleSaveAndDownload = () => {
    setSaving(true);
    setSaveError(null);

    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const localDateTimeStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
    
    const updatedBooking = {
      ...booking,
      booking_date: localDateTimeStr
    };

    setBooking(updatedBooking);

    // Save to the database first
    fetch(`${API_BASE_URL}/api/booking/save/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBooking),
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to save booking details to database");
        return res.json();
      })
      .then(data => {
        setSaving(false);
        setDataSource('Django Live API Database');
        // Trigger browser print flow (which defaults to Save as PDF)
        window.print();
      })
      .catch(err => {
        console.error("Error saving booking:", err);
        setSaveError("Save failed");
        setSaving(false);
        if (window.confirm("Could not save to database. Do you still want to download the PDF?")) {
          window.print();
        }
      });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      {/* Top Header Navbar - Hidden when printing */}
      <header className="no-print bg-white border-b border-slate-200 px-6 py-4 flex justify-end sticky top-0 z-50 shadow-sm">
        <div className="flex items-center space-x-4">
          {autoSaveStatus && (
            <span className={`text-[10px] font-bold font-mono tracking-wider uppercase transition-all duration-300 ${autoSaveStatus.includes('failed') ? 'text-red-500' :
                autoSaveStatus.includes('Saving') ? 'text-yellow-600 animate-pulse' :
                  'text-green-600'
              }`}>
              {autoSaveStatus.includes('Saving') ? '⏳ ' : autoSaveStatus.includes('saved') ? '✓ ' : '⚠️ '}
              {autoSaveStatus}
            </span>
          )}
          <div className="flex flex-col items-end space-y-1">
            <button
              onClick={handleSaveAndDownload}
              disabled={saving}
              className={`${saving ? 'bg-yellow-400 opacity-80 cursor-wait' : 'bg-yellow-500 hover:bg-yellow-600'} text-slate-950 font-bold px-5 py-2.5 rounded-xl shadow-md shadow-yellow-500/10 hover:shadow-yellow-500/20 text-xs tracking-wider uppercase transition-all flex items-center space-x-1.5`}
            >
              {saving ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                  <span>Saving Booking...</span>
                </>
              ) : (
                <>
                  <span>📥</span>
                  <span>Download PDF</span>
                </>
              )}
            </button>
            {saveError && (
              <span className="text-[10px] text-red-500 font-semibold font-mono">{saveError}</span>
            )}
          </div>
        </div>
      </header>

      {/* Main Grid Splitter */}
      <div className="max-w-[1550px] mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* LEFT COLUMN: Input form editor - Hidden when printing */}
        <section className="no-print lg:col-span-5 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden sticky top-24">

          {/* Form Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50 p-1">
            <button
              onClick={() => setActiveFormTab('general')}
              className={`flex-1 py-3 px-3 rounded-lg text-[11px] font-bold tracking-wider uppercase transition-all duration-500 ${(highlightedFields.booking_id || highlightedFields.booking_date || highlightedFields.passenger) ? 'border-green-500 bg-green-50 text-green-700 ring-2 ring-green-200 shadow-sm' : ''
                } ${activeFormTab === 'general'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              General & Passenger {(highlightedFields.booking_id || highlightedFields.booking_date || highlightedFields.passenger) && '✨'}
            </button>
            <button
              onClick={() => setActiveFormTab('outbound')}
              className={`flex-1 py-3 px-3 rounded-lg text-[11px] font-bold tracking-wider uppercase transition-all duration-500 ${highlightedFields.segments ? 'border-green-500 bg-green-50 text-green-700 ring-2 ring-green-200 shadow-sm' : ''
                } ${activeFormTab === 'outbound'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              Outbound Legs {highlightedFields.segments && '✨'}
            </button>
            <button
              onClick={() => setActiveFormTab('return')}
              className={`flex-1 py-3 px-3 rounded-lg text-[11px] font-bold tracking-wider uppercase transition-all duration-500 ${highlightedFields.segments ? 'border-green-500 bg-green-50 text-green-700 ring-2 ring-green-200 shadow-sm' : ''
                } ${activeFormTab === 'return'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              Return Legs {highlightedFields.segments && '✨'}
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6 text-xs">

            {activeFormTab === 'general' && (
              <div className="space-y-5">

                {/* Ticket Auto-fill Dropzone */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 relative overflow-hidden transition-all hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">Auto-fill from Ticket (PDF/Image)</span>
                    {ocrSuccess && (
                      <span className="text-[10px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded border border-green-200">
                        ✓ Extracted
                      </span>
                    )}
                  </div>

                  <div className="relative group">
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp, application/pdf"
                      onChange={handleOcrUpload}
                      disabled={ocrUploading}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                      id="screenshot-ocr-upload"
                    />
                    <div className={`border-2 border-dashed rounded-lg p-5 flex flex-col items-center justify-center space-y-2 transition-all ${ocrUploading ? 'border-yellow-400 bg-yellow-50/10' :
                        ocrSuccess ? 'border-green-400 bg-green-50/10' :
                          'border-slate-300 hover:border-yellow-500 bg-white hover:bg-slate-50/55'
                      }`}>
                      {ocrUploading ? (
                        <>
                          <div className="w-7 h-7 border-3 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                          <p className="font-bold text-yellow-600 animate-pulse text-[11px]">Analyzing Ticket...</p>
                          <p className="text-[9px] text-slate-400">Extracting flight details from file</p>
                        </>
                      ) : (
                        <>
                          <span className="text-xl">📄</span>
                          <p className="font-bold text-slate-700 text-[11px] group-hover:text-yellow-600 transition-colors">
                            {ocrSuccess ? 'Upload another ticket/image' : 'Upload Ticket File (PDF, PNG, JPEG)'}
                          </p>
                          <p className="text-[9px] text-slate-400 text-center">
                            Drag & drop or click to upload PDF, PNG, or JPEG. Autofills Booking ID, Date, Airline, Passenger details.
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {ocrError && (
                    <div className="text-[10px] text-red-500 font-semibold bg-red-50 p-2 rounded border border-red-100 flex items-start space-x-1">
                      <span>⚠️</span>
                      <span>{ocrError}</span>
                    </div>
                  )}
                </div>

                <h2 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">Booking Details</h2>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500">Booking ID</label>
                    <input
                      type="text"
                      value={booking.booking_id}
                      onChange={(e) => handleBookingChange('booking_id', e.target.value)}
                      className={`w-full bg-slate-50 border rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-yellow-500 focus:bg-white font-mono transition-all duration-500 ${highlightedFields.booking_id ? 'border-green-500 bg-green-50 shadow-sm shadow-green-100 ring-2 ring-green-200' : 'border-slate-200'
                        }`}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500">Booking Date/Time</label>
                    <input
                      type="datetime-local"
                      value={booking.booking_date ? booking.booking_date.substring(0, 16) : ''}
                      onChange={(e) => handleBookingChange('booking_date', e.target.value)}
                      className={`w-full bg-slate-50 border rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-yellow-500 focus:bg-white transition-all duration-500 ${highlightedFields.booking_date ? 'border-green-500 bg-green-50 shadow-sm shadow-green-100 ring-2 ring-green-200' : 'border-slate-200'
                        }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500">Airline PNR</label>
                    <input
                      type="text"
                      value={booking.segments[0]?.pnr || ''}
                      onChange={(e) => {
                        const val = e.target.value.toUpperCase();
                        setBooking(prev => ({
                          ...prev,
                          segments: prev.segments.map(seg => ({
                            ...seg,
                            pnr: val
                          }))
                        }));
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-yellow-500 focus:bg-white font-mono uppercase"
                      placeholder="e.g. ONFDOJ"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500 font-sans">Common Airline Logo</label>
                    <select
                      value={booking.segments[0]?.airline_logo || 'oman-air-logo-circular.png'}
                      onChange={(e) => {
                        const val = e.target.value;
                        const mapping = AIRLINE_MAPPING[val] || { name: 'Oman Air', code: 'WY' };
                        setBooking(prev => {
                          const updatedSegs = prev.segments.map(seg => ({
                            ...seg,
                            airline_logo: val,
                            airline_name: mapping.name,
                            airline_code: mapping.code
                          }));
                          return { ...prev, segments: updatedSegs };
                        });
                      }}
                      className={`w-full bg-slate-50 border rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-yellow-500 focus:bg-white font-sans text-xs transition-all duration-500 ${highlightedFields.airline ? 'border-green-500 bg-green-50 shadow-sm shadow-green-100 ring-2 ring-green-200' : 'border-slate-200'
                        }`}
                    >
                      {AIRLINE_LOGOS.map(logo => (
                        <option key={logo.value} value={logo.value}>{logo.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <h2 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2 pt-2">Passenger Identity</h2>

                <div className="space-y-6">
                  {booking.passengers.map((p, index) => (
                    <div key={index} className="space-y-4 border border-slate-100 p-4 rounded-xl relative bg-slate-50/50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wider font-sans">Passenger #{index + 1}</span>
                        {booking.passengers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePassenger(index)}
                            className="text-red-500 hover:text-red-700 font-bold text-[10px] tracking-wider uppercase transition-all"
                          >
                            ✕ Remove
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1 col-span-1">
                          <label className="font-bold text-slate-500">Title</label>
                          <input
                            type="text"
                            value={p.title || 'MR'}
                            onChange={(e) => handlePassengerChange(index, 'title', e.target.value)}
                            className={`w-full bg-slate-50 border rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-yellow-500 focus:bg-white transition-all duration-500 ${highlightedFields.passenger ? 'border-green-500 bg-green-50 shadow-sm shadow-green-100 ring-2 ring-green-200' : 'border-slate-200'
                              }`}
                            placeholder="e.g. MR"
                          />
                        </div>
                        <div className="space-y-1 col-span-2">
                          <label className="font-bold text-slate-500">Full Name</label>
                          <input
                            type="text"
                            value={p.full_name || ''}
                            onChange={(e) => handlePassengerChange(index, 'full_name', e.target.value)}
                            className={`w-full bg-slate-50 border rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-yellow-500 focus:bg-white transition-all duration-500 ${highlightedFields.passenger ? 'border-green-500 bg-green-50 shadow-sm shadow-green-100 ring-2 ring-green-200' : 'border-slate-200'
                              }`}
                            placeholder="MR IMTIYAZ SAIT RAZACK SAIT"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="font-bold text-slate-500">Date of Birth</label>
                          <input
                            type="date"
                            value={p.date_of_birth || ''}
                            onChange={(e) => handlePassengerChange(index, 'date_of_birth', e.target.value)}
                            className={`w-full bg-slate-50 border rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-yellow-500 focus:bg-white font-mono transition-all duration-500 ${highlightedFields.passenger ? 'border-green-500 bg-green-50 shadow-sm shadow-green-100 ring-2 ring-green-200' : 'border-slate-200'
                              }`}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-bold text-slate-500">Identity Metadata</label>
                          <input
                            type="text"
                            value={p.other_info || ''}
                            onChange={(e) => handlePassengerChange(index, 'other_info', e.target.value)}
                            className={`w-full bg-slate-50 border rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-yellow-500 focus:bg-white transition-all duration-500 ${highlightedFields.passenger ? 'border-green-500 bg-green-50 shadow-sm shadow-green-100 ring-2 ring-green-200' : 'border-slate-200'
                              }`}
                            placeholder="( A )"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addPassenger}
                    className="w-full mt-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-xl transition-all text-xs flex items-center justify-center space-x-1.5 border border-dashed border-slate-300 hover:border-slate-400"
                  >
                    <span>➕</span>
                    <span>Add Passenger</span>
                  </button>
                </div>
              </div>
            )}

            {/* OUTBOUND SEGMENTS (1 & 2) */}
            {activeFormTab === 'outbound' && (
              <div className="space-y-6">

                {/* Segment 1 */}
                <div className={`space-y-4 border-b border-slate-100 pb-5 transition-all duration-300 ${booking.segments[0]?.is_active === false ? 'opacity-55' : ''}`}>
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center space-x-1.5 flex-1 mr-2">
                      <span className="font-extrabold text-sm text-slate-900 whitespace-nowrap">1. Leg:</span>
                      <input
                        type="text"
                        value={`${booking.segments[0]?.departure_city || ''} → ${booking.segments[0]?.arrival_city || ''}`}
                        onChange={(e) => {
                          const val = e.target.value;
                          const parts = val.split(/[→\->]/).map(p => p.trim());
                          if (parts.length >= 2) {
                            handleSegmentChange(1, 'departure_city', parts[0]);
                            handleSegmentChange(1, 'arrival_city', parts[1]);
                          } else {
                            handleSegmentChange(1, 'departure_city', val);
                          }
                        }}
                        className="font-extrabold text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 focus:outline-none focus:border-yellow-500 focus:bg-white flex-1 font-sans"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="flex items-center space-x-1 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={booking.segments[0]?.is_active !== false}
                          onChange={(e) => handleSegmentChange(1, 'is_active', e.target.checked)}
                          className="w-3.5 h-3.5 accent-yellow-500 cursor-pointer rounded border-slate-300"
                        />
                        <span className={`text-[10px] font-bold uppercase font-mono transition-colors duration-300 ${booking.segments[0]?.is_active !== false ? 'text-green-600' : 'text-slate-400'}`}>
                          {booking.segments[0]?.is_active !== false ? 'Active' : 'Inactive'}
                        </span>
                      </label>
                      <span className="text-[10px] text-yellow-600 font-mono whitespace-nowrap bg-yellow-50 px-1.5 py-0.5 rounded border border-yellow-200/50">Seq 1</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Carrier</label>
                      <input
                        type="text"
                        value={booking.segments[0]?.airline_name || ''}
                        onChange={(e) => handleSegmentChange(1, 'airline_name', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none text-[11px]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Code</label>
                      <input
                        type="text"
                        value={booking.segments[0]?.airline_code || ''}
                        onChange={(e) => handleSegmentChange(1, 'airline_code', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none text-[11px]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Flight No</label>
                      <input
                        type="text"
                        value={booking.segments[0]?.flight_number || ''}
                        onChange={(e) => handleSegmentChange(1, 'flight_number', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none text-[11px]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Airline PNR</label>
                      <input
                        type="text"
                        value={booking.segments[0]?.pnr || ''}
                        onChange={(e) => handleSegmentChange(1, 'pnr', e.target.value.toUpperCase())}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none font-mono text-[11px] uppercase"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Departure City</label>
                      <input
                        type="text"
                        value={booking.segments[0]?.departure_city || ''}
                        onChange={(e) => handleSegmentChange(1, 'departure_city', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Departure Country</label>
                      <input
                        type="text"
                        value={booking.segments[0]?.departure_country || ''}
                        onChange={(e) => handleSegmentChange(1, 'departure_country', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Arrival City</label>
                      <input
                        type="text"
                        value={booking.segments[0]?.arrival_city || ''}
                        onChange={(e) => handleSegmentChange(1, 'arrival_city', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Arrival Country</label>
                      <input
                        type="text"
                        value={booking.segments[0]?.arrival_country || ''}
                        onChange={(e) => handleSegmentChange(1, 'arrival_country', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Depart Airport</label>
                      <input
                        type="text"
                        value={booking.segments[0]?.departure_airport_name || ''}
                        onChange={(e) => handleSegmentChange(1, 'departure_airport_name', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Depart Terminal</label>
                      <input
                        type="text"
                        value={booking.segments[0]?.departure_terminal || ''}
                        onChange={(e) => handleSegmentChange(1, 'departure_terminal', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Arrival Airport</label>
                      <input
                        type="text"
                        value={booking.segments[0]?.arrival_airport_name || ''}
                        onChange={(e) => handleSegmentChange(1, 'arrival_airport_name', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Arrival Terminal</label>
                      <input
                        type="text"
                        value={booking.segments[0]?.arrival_terminal || ''}
                        onChange={(e) => handleSegmentChange(1, 'arrival_terminal', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Departure Time</label>
                      <input
                        type="datetime-local"
                        value={booking.segments[0]?.departure_time ? booking.segments[0].departure_time.substring(0, 16) : ''}
                        onChange={(e) => handleSegmentChange(1, 'departure_time', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Arrival Time</label>
                      <input
                        type="datetime-local"
                        value={booking.segments[0]?.arrival_time ? booking.segments[0].arrival_time.substring(0, 16) : ''}
                        onChange={(e) => handleSegmentChange(1, 'arrival_time', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Duration</label>
                      <input
                        type="text"
                        value={booking.segments[0]?.duration || ''}
                        onChange={(e) => handleSegmentChange(1, 'duration', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Layover Duration</label>
                      <input
                        type="text"
                        value={booking.segments[0]?.layover_duration || ''}
                        onChange={(e) => handleSegmentChange(1, 'layover_duration', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Segment 2 */}
                <div className={`space-y-4 transition-all duration-300 ${booking.segments[1]?.is_active === false ? 'opacity-55' : ''}`}>
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center space-x-1.5 flex-1 mr-2">
                      <span className="font-extrabold text-sm text-slate-900 whitespace-nowrap">2. Leg:</span>
                      <input
                        type="text"
                        value={`${booking.segments[1]?.departure_city || ''} → ${booking.segments[1]?.arrival_city || ''}`}
                        onChange={(e) => {
                          const val = e.target.value;
                          const parts = val.split(/[→\->]/).map(p => p.trim());
                          if (parts.length >= 2) {
                            handleSegmentChange(2, 'departure_city', parts[0]);
                            handleSegmentChange(2, 'arrival_city', parts[1]);
                          } else {
                            handleSegmentChange(2, 'departure_city', val);
                          }
                        }}
                        className="font-extrabold text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 focus:outline-none focus:border-yellow-500 focus:bg-white flex-1 font-sans"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="flex items-center space-x-1 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={booking.segments[1]?.is_active !== false}
                          onChange={(e) => handleSegmentChange(2, 'is_active', e.target.checked)}
                          className="w-3.5 h-3.5 accent-yellow-500 cursor-pointer rounded border-slate-300"
                        />
                        <span className={`text-[10px] font-bold uppercase font-mono transition-colors duration-300 ${booking.segments[1]?.is_active !== false ? 'text-green-600' : 'text-slate-400'}`}>
                          {booking.segments[1]?.is_active !== false ? 'Active' : 'Inactive'}
                        </span>
                      </label>
                      <span className="text-[10px] text-yellow-600 font-mono whitespace-nowrap bg-yellow-50 px-1.5 py-0.5 rounded border border-yellow-200/50">Seq 2</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Carrier</label>
                      <input
                        type="text"
                        value={booking.segments[1]?.airline_name || ''}
                        onChange={(e) => handleSegmentChange(2, 'airline_name', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none text-[11px]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Code</label>
                      <input
                        type="text"
                        value={booking.segments[1]?.airline_code || ''}
                        onChange={(e) => handleSegmentChange(2, 'airline_code', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none text-[11px]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Flight No</label>
                      <input
                        type="text"
                        value={booking.segments[1]?.flight_number || ''}
                        onChange={(e) => handleSegmentChange(2, 'flight_number', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none text-[11px]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Airline PNR</label>
                      <input
                        type="text"
                        value={booking.segments[1]?.pnr || ''}
                        onChange={(e) => handleSegmentChange(2, 'pnr', e.target.value.toUpperCase())}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none font-mono text-[11px] uppercase"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Departure City</label>
                      <input
                        type="text"
                        value={booking.segments[1]?.departure_city || ''}
                        onChange={(e) => handleSegmentChange(2, 'departure_city', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Departure Country</label>
                      <input
                        type="text"
                        value={booking.segments[1]?.departure_country || ''}
                        onChange={(e) => handleSegmentChange(2, 'departure_country', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Arrival City</label>
                      <input
                        type="text"
                        value={booking.segments[1]?.arrival_city || ''}
                        onChange={(e) => handleSegmentChange(2, 'arrival_city', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Arrival Country</label>
                      <input
                        type="text"
                        value={booking.segments[1]?.arrival_country || ''}
                        onChange={(e) => handleSegmentChange(2, 'arrival_country', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Depart Airport</label>
                      <input
                        type="text"
                        value={booking.segments[1]?.departure_airport_name || ''}
                        onChange={(e) => handleSegmentChange(2, 'departure_airport_name', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Depart Terminal</label>
                      <input
                        type="text"
                        value={booking.segments[1]?.departure_terminal || ''}
                        onChange={(e) => handleSegmentChange(2, 'departure_terminal', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Arrival Airport</label>
                      <input
                        type="text"
                        value={booking.segments[1]?.arrival_airport_name || ''}
                        onChange={(e) => handleSegmentChange(2, 'arrival_airport_name', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Arrival Terminal</label>
                      <input
                        type="text"
                        value={booking.segments[1]?.arrival_terminal || ''}
                        onChange={(e) => handleSegmentChange(2, 'arrival_terminal', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Departure Time</label>
                      <input
                        type="datetime-local"
                        value={booking.segments[1]?.departure_time ? booking.segments[1].departure_time.substring(0, 16) : ''}
                        onChange={(e) => handleSegmentChange(2, 'departure_time', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Arrival Time</label>
                      <input
                        type="datetime-local"
                        value={booking.segments[1]?.arrival_time ? booking.segments[1].arrival_time.substring(0, 16) : ''}
                        onChange={(e) => handleSegmentChange(2, 'arrival_time', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Duration</label>
                      <input
                        type="text"
                        value={booking.segments[1]?.duration || ''}
                        onChange={(e) => handleSegmentChange(2, 'duration', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* RETURN SEGMENTS (3 & 4) */}
            {activeFormTab === 'return' && (
              <div className="space-y-6">

                {/* Segment 3 */}
                <div className={`space-y-4 border-b border-slate-100 pb-5 transition-all duration-300 ${booking.segments[2]?.is_active === false ? 'opacity-55' : ''}`}>
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center space-x-1.5 flex-1 mr-2">
                      <span className="font-extrabold text-sm text-slate-900 whitespace-nowrap">3. Leg:</span>
                      <input
                        type="text"
                        value={`${booking.segments[2]?.departure_city || ''} → ${booking.segments[2]?.arrival_city || ''}`}
                        onChange={(e) => {
                          const val = e.target.value;
                          const parts = val.split(/[→\->]/).map(p => p.trim());
                          if (parts.length >= 2) {
                            handleSegmentChange(3, 'departure_city', parts[0]);
                            handleSegmentChange(3, 'arrival_city', parts[1]);
                          } else {
                            handleSegmentChange(3, 'departure_city', val);
                          }
                        }}
                        className="font-extrabold text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 focus:outline-none focus:border-yellow-500 focus:bg-white flex-1 font-sans"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="flex items-center space-x-1 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={booking.segments[2]?.is_active !== false}
                          onChange={(e) => handleSegmentChange(3, 'is_active', e.target.checked)}
                          className="w-3.5 h-3.5 accent-yellow-500 cursor-pointer rounded border-slate-300"
                        />
                        <span className={`text-[10px] font-bold uppercase font-mono transition-colors duration-300 ${booking.segments[2]?.is_active !== false ? 'text-green-600' : 'text-slate-400'}`}>
                          {booking.segments[2]?.is_active !== false ? 'Active' : 'Inactive'}
                        </span>
                      </label>
                      <span className="text-[10px] text-yellow-600 font-mono whitespace-nowrap bg-yellow-50 px-1.5 py-0.5 rounded border border-yellow-200/50">Seq 3</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Carrier</label>
                      <input
                        type="text"
                        value={booking.segments[2]?.airline_name || ''}
                        onChange={(e) => handleSegmentChange(3, 'airline_name', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none text-[11px]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Code</label>
                      <input
                        type="text"
                        value={booking.segments[2]?.airline_code || ''}
                        onChange={(e) => handleSegmentChange(3, 'airline_code', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none text-[11px]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Flight No</label>
                      <input
                        type="text"
                        value={booking.segments[2]?.flight_number || ''}
                        onChange={(e) => handleSegmentChange(3, 'flight_number', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none text-[11px]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Airline PNR</label>
                      <input
                        type="text"
                        value={booking.segments[2]?.pnr || ''}
                        onChange={(e) => handleSegmentChange(3, 'pnr', e.target.value.toUpperCase())}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none font-mono text-[11px] uppercase"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Departure City</label>
                      <input
                        type="text"
                        value={booking.segments[2]?.departure_city || ''}
                        onChange={(e) => handleSegmentChange(3, 'departure_city', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Departure Country</label>
                      <input
                        type="text"
                        value={booking.segments[2]?.departure_country || ''}
                        onChange={(e) => handleSegmentChange(3, 'departure_country', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Arrival City</label>
                      <input
                        type="text"
                        value={booking.segments[2]?.arrival_city || ''}
                        onChange={(e) => handleSegmentChange(3, 'arrival_city', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Arrival Country</label>
                      <input
                        type="text"
                        value={booking.segments[2]?.arrival_country || ''}
                        onChange={(e) => handleSegmentChange(3, 'arrival_country', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Depart Airport</label>
                      <input
                        type="text"
                        value={booking.segments[2]?.departure_airport_name || ''}
                        onChange={(e) => handleSegmentChange(3, 'departure_airport_name', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Depart Terminal</label>
                      <input
                        type="text"
                        value={booking.segments[2]?.departure_terminal || ''}
                        onChange={(e) => handleSegmentChange(3, 'departure_terminal', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Arrival Airport</label>
                      <input
                        type="text"
                        value={booking.segments[2]?.arrival_airport_name || ''}
                        onChange={(e) => handleSegmentChange(3, 'arrival_airport_name', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Arrival Terminal</label>
                      <input
                        type="text"
                        value={booking.segments[2]?.arrival_terminal || ''}
                        onChange={(e) => handleSegmentChange(3, 'arrival_terminal', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Departure Time</label>
                      <input
                        type="datetime-local"
                        value={booking.segments[2]?.departure_time ? booking.segments[2].departure_time.substring(0, 16) : ''}
                        onChange={(e) => handleSegmentChange(3, 'departure_time', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Arrival Time</label>
                      <input
                        type="datetime-local"
                        value={booking.segments[2]?.arrival_time ? booking.segments[2].arrival_time.substring(0, 16) : ''}
                        onChange={(e) => handleSegmentChange(3, 'arrival_time', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Duration</label>
                      <input
                        type="text"
                        value={booking.segments[2]?.duration || ''}
                        onChange={(e) => handleSegmentChange(3, 'duration', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Layover Duration</label>
                      <input
                        type="text"
                        value={booking.segments[2]?.layover_duration || ''}
                        onChange={(e) => handleSegmentChange(3, 'layover_duration', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Segment 4 */}
                <div className={`space-y-4 transition-all duration-300 ${booking.segments[3]?.is_active === false ? 'opacity-55' : ''}`}>
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center space-x-1.5 flex-1 mr-2">
                      <span className="font-extrabold text-sm text-slate-900 whitespace-nowrap">4. Leg:</span>
                      <input
                        type="text"
                        value={`${booking.segments[3]?.departure_city || ''} → ${booking.segments[3]?.arrival_city || ''}`}
                        onChange={(e) => {
                          const val = e.target.value;
                          const parts = val.split(/[→\->]/).map(p => p.trim());
                          if (parts.length >= 2) {
                            handleSegmentChange(4, 'departure_city', parts[0]);
                            handleSegmentChange(4, 'arrival_city', parts[1]);
                          } else {
                            handleSegmentChange(4, 'departure_city', val);
                          }
                        }}
                        className="font-extrabold text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 focus:outline-none focus:border-yellow-500 focus:bg-white flex-1 font-sans"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="flex items-center space-x-1 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={booking.segments[3]?.is_active !== false}
                          onChange={(e) => handleSegmentChange(4, 'is_active', e.target.checked)}
                          className="w-3.5 h-3.5 accent-yellow-500 cursor-pointer rounded border-slate-300"
                        />
                        <span className={`text-[10px] font-bold uppercase font-mono transition-colors duration-300 ${booking.segments[3]?.is_active !== false ? 'text-green-600' : 'text-slate-400'}`}>
                          {booking.segments[3]?.is_active !== false ? 'Active' : 'Inactive'}
                        </span>
                      </label>
                      <span className="text-[10px] text-yellow-600 font-mono whitespace-nowrap bg-yellow-50 px-1.5 py-0.5 rounded border border-yellow-200/50">Seq 4</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Carrier</label>
                      <input
                        type="text"
                        value={booking.segments[3]?.airline_name || ''}
                        onChange={(e) => handleSegmentChange(4, 'airline_name', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none text-[11px]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Code</label>
                      <input
                        type="text"
                        value={booking.segments[3]?.airline_code || ''}
                        onChange={(e) => handleSegmentChange(4, 'airline_code', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none text-[11px]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Flight No</label>
                      <input
                        type="text"
                        value={booking.segments[3]?.flight_number || ''}
                        onChange={(e) => handleSegmentChange(4, 'flight_number', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none text-[11px]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Airline PNR</label>
                      <input
                        type="text"
                        value={booking.segments[3]?.pnr || ''}
                        onChange={(e) => handleSegmentChange(4, 'pnr', e.target.value.toUpperCase())}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none font-mono text-[11px] uppercase"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Departure City</label>
                      <input
                        type="text"
                        value={booking.segments[3]?.departure_city || ''}
                        onChange={(e) => handleSegmentChange(4, 'departure_city', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Departure Country</label>
                      <input
                        type="text"
                        value={booking.segments[3]?.departure_country || ''}
                        onChange={(e) => handleSegmentChange(4, 'departure_country', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Arrival City</label>
                      <input
                        type="text"
                        value={booking.segments[3]?.arrival_city || ''}
                        onChange={(e) => handleSegmentChange(4, 'arrival_city', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Arrival Country</label>
                      <input
                        type="text"
                        value={booking.segments[3]?.arrival_country || ''}
                        onChange={(e) => handleSegmentChange(4, 'arrival_country', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Depart Airport</label>
                      <input
                        type="text"
                        value={booking.segments[3]?.departure_airport_name || ''}
                        onChange={(e) => handleSegmentChange(4, 'departure_airport_name', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Depart Terminal</label>
                      <input
                        type="text"
                        value={booking.segments[3]?.departure_terminal || ''}
                        onChange={(e) => handleSegmentChange(4, 'departure_terminal', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Arrival Airport</label>
                      <input
                        type="text"
                        value={booking.segments[3]?.arrival_airport_name || ''}
                        onChange={(e) => handleSegmentChange(4, 'arrival_airport_name', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Arrival Terminal</label>
                      <input
                        type="text"
                        value={booking.segments[3]?.arrival_terminal || ''}
                        onChange={(e) => handleSegmentChange(4, 'arrival_terminal', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Departure Time</label>
                      <input
                        type="datetime-local"
                        value={booking.segments[3]?.departure_time ? booking.segments[3].departure_time.substring(0, 16) : ''}
                        onChange={(e) => handleSegmentChange(4, 'departure_time', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Arrival Time</label>
                      <input
                        type="datetime-local"
                        value={booking.segments[3]?.arrival_time ? booking.segments[3].arrival_time.substring(0, 16) : ''}
                        onChange={(e) => handleSegmentChange(4, 'arrival_time', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500">Duration</label>
                      <input
                        type="text"
                        value={booking.segments[3]?.duration || ''}
                        onChange={(e) => handleSegmentChange(4, 'duration', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>
        </section>

        {/* RIGHT COLUMN: Ticket Preview Container */}
        <section className="lg:col-span-7 bg-white p-4 md:p-6 border border-slate-200 rounded-2xl shadow-sm flex flex-col items-center overflow-x-auto min-h-[80vh]">
          <div className="no-print w-full flex items-center justify-between border-b border-slate-100 pb-3 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Document Preview</span>
            <span className="text-[10px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md font-mono">1:1 Printed Ratio</span>
          </div>

          {/* Printable Ticket Preview */}
          <PrintableTicket booking={booking} />
        </section>

      </div>
    </div>
  );
}

export default App;
