import React from 'react';


// SVG Icons for Dangerous Goods & Oman Aviation Logo
const OmanAirLogo = () => (
  <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#c59b27] inline-block mr-1">
    <path d="M10 50C10 27.9086 27.9086 10 50 10C60 10 70 14 78 20C73 22 65 20 58 20C40 20 28 32 28 50C28 68 40 80 58 80C65 80 73 78 78 80C70 86 60 90 50 90C27.9086 90 10 72.0914 10 50Z" fill="currentColor" opacity="0.15"/>
    <path d="M45 42C48 35 55 30 65 30C75 30 82 35 85 42C75 40 65 42 55 45C50 46 47 45 45 42Z" fill="currentColor"/>
    <path d="M40 52C42 45 48 40 58 40C68 40 75 45 78 52C70 50 60 52 50 55C45 56 42 55 40 52Z" fill="currentColor" opacity="0.8"/>
    <path d="M35 62C38 55 42 50 52 50C62 50 68 55 70 62C62 60 52 62 45 65C40 66 38 65 35 62Z" fill="currentColor" opacity="0.6"/>
  </svg>
);

const WarningIcons = {
  Lighters: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700">
      <path d="M18 12h-4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2z" />
      <path d="M14 12V8a2 2 0 0 1 2-2h1" />
      <path d="M16 6a3 3 0 0 1-3-3 3 3 0 0 1 3 3z" className="text-red-500 fill-red-500" />
    </svg>
  ),
  Liquids: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700">
      <path d="M10 2h4l1 4h-6l1-4z" />
      <path d="M6 10c0-2 2-4 6-4s6 2 6 4v10c0 1.1-.9 2-2 2H8a2 2 0 0 1-2-2V10z" />
      <line x1="6" y1="12" x2="18" y2="12" />
      <line x1="6" y1="16" x2="18" y2="16" />
    </svg>
  ),
  Toxic: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700">
      <circle cx="12" cy="10" r="4" />
      <path d="M12 14c-1.5 0-3 1-3 2.5s1 2.5 3 2.5 3-1 3-2.5-1.5-2.5-3-2.5z" />
      <path d="M6 20l3-3M18 20l-3-3M6 4l3 3M18 4l-3 3" />
    </svg>
  ),
  Bleach: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700">
      <path d="M7 3h10v4H7V3z" />
      <path d="M5 8h14v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8z" />
      <circle cx="12" cy="14" r="2" />
    </svg>
  ),
  Explosives: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2 2" className="text-orange-500" />
    </svg>
  ),
  Infectious: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700">
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="7" r="2" />
      <circle cx="8.5" cy="13.5" r="2" />
      <circle cx="15.5" cy="13.5" r="2" />
      <path d="M12 9c-1 0-2 1-2 2M10.5 12c.5-1 1.5-1.5 2.5-1.5M13.5 12c-.5 1-1.5 1.5-2.5 1.5" />
    </svg>
  ),
  Spray: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700">
      <rect x="8" y="7" width="8" height="14" rx="2" />
      <path d="M10 7V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3" />
      <path d="M6 5h1M4 7h1M5 9h1" className="stroke-red-500" />
    </svg>
  ),
  Radioactive: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700">
      <circle cx="12" cy="12" r="2" />
      <path d="M12 2v6M12 16v6M2 12h6M16 12h6" />
      <path d="M7.75 7.75l3 3M13.25 13.25l3 3M7.75 16.25l3-3M13.25 10.75l3 3" />
    </svg>
  ),
  Gas: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700">
      <path d="M9 2h6v2H9V2z" />
      <path d="M7 6h10v15a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V6z" />
      <path d="M12 10v6M10 13h4" />
    </svg>
  ),
  Corrosive: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700">
      <path d="M3 12h6M15 12h6" />
      <path d="M12 6V3M12 18v3" />
      <path d="M8 8l8 8M8 16l8-8" />
    </svg>
  ),
  PowerBank: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700">
      <rect x="6" y="4" width="12" height="16" rx="2" />
      <circle cx="10" cy="8" r="1" />
      <circle cx="14" cy="8" r="1" />
      <path d="M9 14h6" />
      <path d="M12 12v4" />
    </svg>
  ),
  Battery: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700">
      <rect x="6" y="6" width="12" height="14" rx="1" />
      <path d="M9 6V4h6v2" />
      <path d="M10 11h4M12 9v4" />
      <path d="M10 16h4" />
    </svg>
  )
};

export default function PrintableTicket({ booking }) {
  if (!booking) return null;

  const parseDateLocal = (dateString) => {
    if (!dateString) return null;
    const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})/);
    if (match) {
      const [_, y, m, d, h, min] = match;
      return new Date(parseInt(y), parseInt(m) - 1, parseInt(d), parseInt(h), parseInt(min));
    }
    const matchDate = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (matchDate) {
      const [_, y, m, d] = matchDate;
      return new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
    }
    return new Date(dateString);
  };

  const getCityCode = (cityName) => {
    if (!cityName) return '';
    const city = cityName.toLowerCase().trim();
    if (city.includes('chennai')) return 'MAA';
    if (city.includes('muscat')) return 'MCT';
    if (city.includes('jeddah')) return 'JED';
    return cityName.substring(0, 3).toUpperCase();
  };

  // Format header date: e.g. "Jun 18, 2026 6:27 PM"
  const formatHeaderDate = (dateString) => {
    try {
      const date = parseDateLocal(dateString);
      if (!date || isNaN(date.getTime())) return dateString;
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }).replace(',', '');
    } catch (e) {
      return dateString;
    }
  };

  // Format flight dates: e.g. "Tue, 23 Jun '26, 08:15"
  const formatFlightDate = (dateString) => {
    try {
      const date = parseDateLocal(dateString);
      if (!date || isNaN(date.getTime())) return dateString;
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      const dayName = days[date.getDay()];
      const dayVal = String(date.getDate());
      const monthName = months[date.getMonth()];
      const yearShort = String(date.getFullYear()).slice(-2);
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      
      // Return formatting matching the screenshots: e.g., "Tue, 23 Jun '26, 08:15"
      return `${dayName}, ${dayVal} ${monthName} '${yearShort}, ${hours}:${minutes}`;
    } catch (e) {
      return dateString;
    }
  };

  // Extract Segments
  const seg1 = booking.segments.find(s => s.sequence === 1) || {};
  const seg2 = booking.segments.find(s => s.sequence === 2) || {};
  const seg3 = booking.segments.find(s => s.sequence === 3) || {};
  const seg4 = booking.segments.find(s => s.sequence === 4) || {};
  
  const passenger = booking.passengers[0] || { full_name: '', date_of_birth: '', other_info: '' };

  // Barcode matching the exact PDF417 barcode image uploaded by the user - renders a single barcode
  const renderSingleBarcode = (idx) => {
    const BARCODE_ROWS = [
      "11010011010111001011011001011011101010110110110011",
      "10110100111010100110111010110100110101101001110101",
      "11001110101101001101110101011011101011011010011011",
      "10110100110110100111010110110100111010110111010101",
      "11011101011011010011011011101010011011011101011011",
      "10100111010100110111010110110110011101011010011011",
      "11011010011101011010011011101011010011101011011011",
      "10110110010110111010101101101100111010110111010101",
      "11001110101101001101110101011011101011011010011011",
      "10110100110110100111010110110100111010110111010101",
      "11011101011011010011011011101010011011011101011011",
      "10100111010100110111010110110110011101011010011011"
    ];

    return (
      <div className="py-1 bg-white select-none inline-block text-left">
        <svg width="240" height="40" viewBox="0 0 272 48">
          {/* Left Start Pattern */}
          <rect x="0" y="0" width="8" height="48" fill="black" />
          <rect x="11" y="0" width="1.5" height="48" fill="black" />
          <rect x="14.5" y="0" width="1.5" height="48" fill="black" />
          <rect x="18" y="0" width="1.5" height="48" fill="black" />
          <rect x="21" y="0" width="3" height="48" fill="black" />
          <rect x="26" y="0" width="1.5" height="48" fill="black" />
          <rect x="29" y="0" width="1.5" height="48" fill="black" />
          
          {/* Center Matrix */}
          {BARCODE_ROWS.map((row, rIdx) => {
            const y = rIdx * 4;
            return row.split("").map((char, cIdx) => {
              // Alter a few bits based on passenger index so barcodes are visually unique
              const bit = ((cIdx + idx * 7) % 19 === 0) ? (char === "1" ? "0" : "1") : char;
              if (bit === "1") {
                const x = 32 + cIdx * 4;
                return <rect key={`${rIdx}-${cIdx}`} x={x} y={y} width="4" height="4" fill="black" />;
              }
              return null;
            });
          })}
          
          {/* Right Stop Pattern (Thick Block on Right End + thin lines) */}
          <rect x="232" y="0" width="12" height="48" fill="black" />
          <rect x="248" y="0" width="1.5" height="48" fill="black" />
          <rect x="251.5" y="0" width="1.5" height="48" fill="black" />
          <rect x="255" y="0" width="1.5" height="48" fill="black" />
          <rect x="258.5" y="0" width="3" height="48" fill="black" />
          <rect x="263.5" y="0" width="1.5" height="48" fill="black" />
          <rect x="267" y="0" width="1.5" height="48" fill="black" />
        </svg>
      </div>
    );
  };

  return (
    <div className="print-area w-full max-w-[850px] bg-white text-black p-8 font-sans border border-gray-300 shadow-md text-[12px] leading-normal select-none">
      
      {/* Header (Jun 18, 2026 6:27 PM & Booking ID) */}
      <div className="border-b border-gray-300 pb-2 mb-4 text-left">
        <div className="text-gray-900 font-normal">{formatHeaderDate(booking.booking_date)}</div>
        <div className="text-gray-900 font-normal mt-0.5">Booking ID : {booking.booking_id}</div>
      </div>

      {/* ========================================================
          OUTBOUND CONTAINER
          ======================================================== */}
      <div className="border border-gray-300 rounded mb-6 p-4 space-y-4">
        
        {/* Outbound Sub-Header Info */}
        <div className="flex justify-between items-start">
          <div className="bg-gray-100 border border-gray-300 px-4 py-2 font-bold text-xs rounded text-gray-800">
            {seg1.departure_city || 'Chennai'} → {seg2.arrival_city || 'Jeddah'} on {seg1.departure_time ? parseDateLocal(seg1.departure_time).toLocaleDateString('en-US', {month: 'short', day: '2-digit'}) : 'Jun 23rd'} 2026
          </div>
          <div className="border border-gray-300 bg-gray-50 px-4 py-1.5 rounded flex flex-col items-end">
            <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Airline PNR:</span>
            <span className="text-xs font-black text-black font-mono">ONFDOJ</span>
          </div>
        </div>

        {/* Leg 1 details */}
        <div className="border-b border-gray-200 pb-4">
          <div className="grid grid-cols-12 gap-2 items-center">
            
            {/* Airline Logo column */}
            <div className="col-span-3 flex items-center space-x-2 text-left">
              <img 
                src={`/static/airlinelogo/${seg1.airline_logo || 'oman-air-logo-circular.png'}`} 
                alt={seg1.airline_name || 'Airline Logo'} 
                className="w-7 h-7 object-contain inline-block mr-1"
              />
              <div>
                <div className="font-bold text-[11px] text-gray-900 leading-none">{seg1.airline_name || 'Oman Aviation'}</div>
                <div className="text-gray-500 font-mono text-[10px] mt-1">{seg1.airline_code || 'WY'}- {seg1.flight_number || '252'}</div>
              </div>
            </div>

            {/* Departure Column */}
            <div className="col-span-3 text-left">
              <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Departure</div>
              <div className="font-bold text-gray-900 mt-0.5">{formatFlightDate(seg1.departure_time)}</div>
              <div className="font-semibold text-gray-800 text-[11px]">{seg1.departure_city}, {seg1.departure_country}</div>
              <div className="text-gray-500 text-[10px]">{seg1.departure_airport_name}</div>
              {seg1.departure_terminal && (
                <div className="text-gray-500 text-[10px]">{seg1.departure_terminal}</div>
              )}
            </div>

            {/* Stop indicator Arrow */}
            <div className="col-span-2 text-center flex flex-col items-center justify-center">
              <span className="text-[9px] text-gray-500 font-bold">Non-Stop</span>
              <div className="w-24 flex items-center justify-center mt-1">
                <div className="h-[1.5px] bg-gray-400 w-full relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-gray-500 rotate-45"></div>
                </div>
              </div>
            </div>

            {/* Arrival Column */}
            <div className="col-span-3 text-left">
              <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Arrival</div>
              <div className="font-bold text-gray-900 mt-0.5">{formatFlightDate(seg1.arrival_time)}</div>
              <div className="font-semibold text-gray-800 text-[11px]">{seg1.arrival_city}, {seg1.arrival_country}</div>
              <div className="text-gray-500 text-[10px]">{seg1.arrival_airport_name}</div>
              {seg1.arrival_terminal && (
                <div className="text-gray-500 text-[10px]">{seg1.arrival_terminal}</div>
              )}
            </div>

            {/* Cabin details */}
            <div className="col-span-1 text-right">
              <div className="font-bold text-gray-800">{seg1.duration || '3h 50m'}</div>
              <div className="text-gray-500 text-[10px] mt-0.5">{seg1.cabin_class || 'Economy'}</div>
            </div>

          </div>

          <div className="mt-4 text-[10px] text-gray-600 space-y-0.5">
            <div>Fare Type : {seg1.fare_type || 'NA'}</div>
            <div>Baggage Information</div>
            <div className="font-semibold text-gray-800">Adult - Check-in: {seg1.checkin_baggage || '30KG'}, Cabin : {seg1.cabin_baggage || '7KG'},</div>
          </div>
        </div>

        {/* Layover Banner */}
        {seg1.layover_duration && (
          <div className="bg-gray-100 border border-gray-300 rounded px-4 py-1.5 text-center text-xs font-semibold text-gray-700">
            Layover Timer - {seg1.layover_duration}
          </div>
        )}

        {/* Leg 2 details */}
        <div>
          <div className="grid grid-cols-12 gap-2 items-center">
            
            {/* Airline Logo */}
            <div className="col-span-3 flex items-center space-x-2 text-left">
              <img 
                src={`/static/airlinelogo/${seg2.airline_logo || 'oman-air-logo-circular.png'}`} 
                alt={seg2.airline_name || 'Airline Logo'} 
                className="w-7 h-7 object-contain inline-block mr-1"
              />
              <div>
                <div className="font-bold text-[11px] text-gray-900 leading-none">{seg2.airline_name || 'Oman Aviation'}</div>
                <div className="text-gray-500 font-mono text-[10px] mt-1">{seg2.airline_code || 'WY'}- {seg2.flight_number || '675'}</div>
              </div>
            </div>

            {/* Departure */}
            <div className="col-span-3 text-left">
              <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Departure</div>
              <div className="font-bold text-gray-900 mt-0.5">{formatFlightDate(seg2.departure_time)}</div>
              <div className="font-semibold text-gray-800 text-[11px]">{seg2.departure_city}, {seg2.departure_country}</div>
              <div className="text-gray-500 text-[10px]">{seg2.departure_airport_name}</div>
              {seg2.departure_terminal && (
                <div className="text-gray-500 text-[10px]">{seg2.departure_terminal}</div>
              )}
            </div>

            {/* Stop Indicator */}
            <div className="col-span-2 text-center flex flex-col items-center justify-center">
              <span className="text-[9px] text-gray-500 font-bold">Non-Stop</span>
              <div className="w-24 flex items-center justify-center mt-1">
                <div className="h-[1.5px] bg-gray-400 w-full relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-gray-500 rotate-45"></div>
                </div>
              </div>
            </div>

            {/* Arrival */}
            <div className="col-span-3 text-left">
              <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Arrival</div>
              <div className="font-bold text-gray-900 mt-0.5">{formatFlightDate(seg2.arrival_time)}</div>
              <div className="font-semibold text-gray-800 text-[11px]">{seg2.arrival_city}, {seg2.arrival_country}</div>
              <div className="text-gray-500 text-[10px]">{seg2.arrival_airport_name}</div>
              {seg2.arrival_terminal && (
                <div className="text-gray-500 text-[10px]">{seg2.arrival_terminal}</div>
              )}
            </div>

            {/* Class */}
            <div className="col-span-1 text-right">
              <div className="font-bold text-gray-800">{seg2.duration || '3h 20m'}</div>
              <div className="text-gray-500 text-[10px] mt-0.5">{seg2.cabin_class || 'Economy'}</div>
            </div>

          </div>

          <div className="mt-4 text-[10px] text-gray-600 space-y-0.5">
            <div>Fare Type : {seg2.fare_type || 'NA'}</div>
            <div>Baggage Information</div>
            <div className="font-semibold text-gray-800">Adult - Check-in: {seg2.checkin_baggage || '30KG'}, Cabin : {seg2.cabin_baggage || '7KG'},</div>
          </div>
        </div>

      </div>

      {/* ========================================================
          PASSENGER DETAILS TABLE (OUTBOUND)
          ======================================================== */}
      <div className="border border-gray-300 rounded mb-8 overflow-hidden">
        <div className="bg-gray-200 border-b border-gray-300 px-4 py-2 font-bold text-xs text-gray-800 text-left">
          Passenger Details ( {booking.passengers.length} )
        </div>
        <table className="min-w-full divide-y divide-gray-300 text-left text-xs">
          <thead>
            <tr className="bg-gray-50 font-bold text-gray-700">
              <th className="px-4 py-2 border-r border-gray-300 w-12 text-center">Sr.</th>
              <th className="px-4 py-2 border-r border-gray-300 w-5/12">Name, DOB, Passport, & FF</th>
              <th className="px-4 py-2 border-r border-gray-300 w-3/12">PNR & Ticket No.</th>
              <th className="px-4 py-2">Meal, Baggage, Seat & Other Preference</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {booking.passengers.map((p, idx) => (
              <tr key={idx}>
                <td className="px-4 py-4 border-r border-gray-300 text-center font-bold">{idx + 1}</td>
                <td className="px-4 py-4 border-r border-gray-300 font-semibold text-gray-900 text-left space-y-2">
                  <div>{p.full_name} {p.other_info ? `${p.other_info}` : ''} {p.date_of_birth}</div>
                  <div className="pt-2">
                    {renderSingleBarcode(idx)}
                  </div>
                </td>
                <td className="px-4 py-4 border-r border-gray-300 font-mono space-y-1">
                  <div>{seg1.departure_city && seg1.arrival_city ? `${getCityCode(seg1.departure_city)}-${getCityCode(seg1.arrival_city)}` : 'MAA-MCT'} : <strong className="font-black text-black">ONFDOJ</strong></div>
                  <div>{seg2.departure_city && seg2.arrival_city ? `${getCityCode(seg2.departure_city)}-${getCityCode(seg2.arrival_city)}` : 'MCT-JED'} : <strong className="font-black text-black">ONFDOJ</strong></div>
                </td>
                <td className="px-4 py-4 text-gray-400 italic"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ========================================================
          INBOUND CONTAINER
          ======================================================== */}
      <div className="border border-gray-300 rounded mb-6 p-4 space-y-4 break-before-page">
        
        {/* Inbound Header */}
        <div className="flex justify-between items-start">
          <div className="bg-gray-100 border border-gray-300 px-4 py-2 font-bold text-xs rounded text-gray-800">
            {seg3.departure_city || 'Jeddah'} → {seg4.arrival_city || 'Chennai'} on {seg3.departure_time ? parseDateLocal(seg3.departure_time).toLocaleDateString('en-US', {month: 'short', day: '2-digit'}) : 'Sep 18th'} 2026
          </div>
          <div className="border border-gray-300 bg-gray-50 px-4 py-1.5 rounded flex flex-col items-end">
            <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Airline PNR:</span>
            <span className="text-xs font-black text-black font-mono">ONFDOJ</span>
          </div>
        </div>

        {/* Leg 3 details */}
        <div className="border-b border-gray-200 pb-4">
          <div className="grid grid-cols-12 gap-2 items-center">
            
            {/* Airline Logo */}
            <div className="col-span-3 flex items-center space-x-2 text-left">
              <img 
                src={`/static/airlinelogo/${seg3.airline_logo || 'oman-air-logo-circular.png'}`} 
                alt={seg3.airline_name || 'Airline Logo'} 
                className="w-7 h-7 object-contain inline-block mr-1"
              />
              <div>
                <div className="font-bold text-[11px] text-gray-900 leading-none">{seg3.airline_name || 'Oman Aviation'}</div>
                <div className="text-gray-500 font-mono text-[10px] mt-1">{seg3.airline_code || 'WY'}- {seg3.flight_number || '674'}</div>
              </div>
            </div>

            {/* Departure */}
            <div className="col-span-3 text-left">
              <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Departure</div>
              <div className="font-bold text-gray-900 mt-0.5">{formatFlightDate(seg3.departure_time)}</div>
              <div className="font-semibold text-gray-800 text-[11px]">{seg3.departure_city}, {seg3.departure_country}</div>
              <div className="text-gray-500 text-[10px]">{seg3.departure_airport_name}</div>
              {seg3.departure_terminal && (
                <div className="text-gray-500 text-[10px]">{seg3.departure_terminal}</div>
              )}
            </div>

            {/* Stop Indicator */}
            <div className="col-span-2 text-center flex flex-col items-center justify-center">
              <span className="text-[9px] text-gray-500 font-bold">Non-Stop</span>
              <div className="w-24 flex items-center justify-center mt-1">
                <div className="h-[1.5px] bg-gray-400 w-full relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-gray-500 rotate-45"></div>
                </div>
              </div>
            </div>

            {/* Arrival */}
            <div className="col-span-3 text-left">
              <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Arrival</div>
              <div className="font-bold text-gray-900 mt-0.5">{formatFlightDate(seg3.arrival_time)}</div>
              <div className="font-semibold text-gray-800 text-[11px]">{seg3.arrival_city}, {seg3.arrival_country}</div>
              <div className="text-gray-500 text-[10px]">{seg3.arrival_airport_name}</div>
              {seg3.arrival_terminal && (
                <div className="text-gray-500 text-[10px]">{seg3.arrival_terminal}</div>
              )}
            </div>

            {/* Cabin */}
            <div className="col-span-1 text-right">
              <div className="font-bold text-gray-800">{seg3.duration || '3h 15m'}</div>
              <div className="text-gray-500 text-[10px] mt-0.5">{seg3.cabin_class || 'Economy'}</div>
            </div>

          </div>

          <div className="mt-4 text-[10px] text-gray-600 space-y-0.5">
            <div>Fare Type : {seg3.fare_type || 'NA'}</div>
            <div>Baggage Information</div>
            <div className="font-semibold text-gray-800">Adult - Check-in: {seg3.checkin_baggage || '30KG'}, Cabin : {seg3.cabin_baggage || '7KG'},</div>
          </div>
        </div>

        {/* Layover Banner */}
        {seg3.layover_duration && (
          <div className="bg-gray-100 border border-gray-300 rounded px-4 py-1.5 text-center text-xs font-semibold text-gray-700">
            Layover Timer - {seg3.layover_duration}
          </div>
        )}

        {/* Leg 4 details */}
        <div>
          <div className="grid grid-cols-12 gap-2 items-center">
            
            {/* Airline Logo */}
            <div className="col-span-3 flex items-center space-x-2 text-left">
              <img 
                src={`/static/airlinelogo/${seg4.airline_logo || 'oman-air-logo-circular.png'}`} 
                alt={seg4.airline_name || 'Airline Logo'} 
                className="w-7 h-7 object-contain inline-block mr-1"
              />
              <div>
                <div className="font-bold text-[11px] text-gray-900 leading-none">{seg4.airline_name || 'Oman Aviation'}</div>
                <div className="text-gray-500 font-mono text-[10px] mt-1">{seg4.airline_code || 'WY'}- {seg4.flight_number || '253'}</div>
              </div>
            </div>

            {/* Departure */}
            <div className="col-span-3 text-left">
              <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Departure</div>
              <div className="font-bold text-gray-900 mt-0.5">{formatFlightDate(seg4.departure_time)}</div>
              <div className="font-semibold text-gray-800 text-[11px]">{seg4.departure_city}, {seg4.departure_country}</div>
              <div className="text-gray-500 text-[10px]">{seg4.departure_airport_name}</div>
              {seg4.departure_terminal && (
                <div className="text-gray-500 text-[10px]">{seg4.departure_terminal}</div>
              )}
            </div>

            {/* Stop Indicator */}
            <div className="col-span-2 text-center flex flex-col items-center justify-center">
              <span className="text-[9px] text-gray-500 font-bold">Non-Stop</span>
              <div className="w-24 flex items-center justify-center mt-1">
                <div className="h-[1.5px] bg-gray-400 w-full relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-gray-500 rotate-45"></div>
                </div>
              </div>
            </div>

            {/* Arrival */}
            <div className="col-span-3 text-left">
              <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Arrival</div>
              <div className="font-bold text-gray-900 mt-0.5">{formatFlightDate(seg4.arrival_time)}</div>
              <div className="font-semibold text-gray-800 text-[11px]">{seg4.arrival_city}, {seg4.arrival_country}</div>
              <div className="text-gray-500 text-[10px]">{seg4.arrival_airport_name}</div>
              {seg4.arrival_terminal && (
                <div className="text-gray-500 text-[10px]">{seg4.arrival_terminal}</div>
              )}
            </div>

            {/* Class */}
            <div className="col-span-1 text-right">
              <div className="font-bold text-gray-800">{seg4.duration || '3h 50m'}</div>
              <div className="text-gray-500 text-[10px] mt-0.5">{seg4.cabin_class || 'Economy'}</div>
            </div>

          </div>

          <div className="mt-4 text-[10px] text-gray-600 space-y-0.5">
            <div>Fare Type : {seg4.fare_type || 'NA'}</div>
            <div>Baggage Information</div>
            <div className="font-semibold text-gray-800">Adult - Check-in: {seg4.checkin_baggage || '30KG'}, Cabin : {seg4.cabin_baggage || '7KG'},</div>
          </div>
        </div>

      </div>

      {/* ========================================================
          PASSENGER DETAILS TABLE (RETURN)
          ======================================================== */}
      <div className="border border-gray-300 rounded mb-8 overflow-hidden">
        <div className="bg-gray-200 border-b border-gray-300 px-4 py-2 font-bold text-xs text-gray-800 text-left">
          Passenger Details ( {booking.passengers.length} )
        </div>
        <table className="min-w-full divide-y divide-gray-300 text-left text-xs">
          <thead>
            <tr className="bg-gray-50 font-bold text-gray-700">
              <th className="px-4 py-2 border-r border-gray-300 w-12 text-center">Sr.</th>
              <th className="px-4 py-2 border-r border-gray-300 w-5/12">Name, DOB, Passport, & FF</th>
              <th className="px-4 py-2 border-r border-gray-300 w-3/12">PNR & Ticket No.</th>
              <th className="px-4 py-2">Meal, Baggage, Seat & Other Preference</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {booking.passengers.map((p, idx) => (
              <tr key={idx}>
                <td className="px-4 py-4 border-r border-gray-300 text-center font-bold">{idx + 1}</td>
                <td className="px-4 py-4 border-r border-gray-300 font-semibold text-gray-900 text-left space-y-2">
                  <div>{p.full_name} {p.other_info ? `${p.other_info}` : ''} {p.date_of_birth}</div>
                  <div className="pt-2">
                    {renderSingleBarcode(idx)}
                  </div>
                </td>
                <td className="px-4 py-4 border-r border-gray-300 font-mono space-y-1">
                  <div>{seg3.departure_city && seg3.arrival_city ? `${getCityCode(seg3.departure_city)}-${getCityCode(seg3.arrival_city)}` : 'JED-MCT'} : <strong className="font-black text-black">ONFDOJ</strong></div>
                  <div>{seg4.departure_city && seg4.arrival_city ? `${getCityCode(seg4.departure_city)}-${getCityCode(seg4.arrival_city)}` : 'MCT-MAA'} : <strong className="font-black text-black">ONFDOJ</strong></div>
                </td>
                <td className="px-4 py-4 text-gray-400 italic"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ========================================================
          IMPORTANT INFORMATION
          ======================================================== */}
      <div className="border border-gray-300 rounded p-4 mb-6 text-left bg-white">
        <div className="text-[#b38f24] font-bold text-xs tracking-wider mb-2">IMPORTANT INFORMATION</div>
        <div className="space-y-1 text-gray-800 text-[10px] leading-relaxed">
          <div>1 - You must web check-in on the airline website and obtain a boarding pass.</div>
          <div>2 - Reach the terminal at least 2 hours prior to the departure for domestic flight and 4 hours prior to the departure of international flight.</div>
          <div>3 - For departure terminal please check with the airline first.</div>
          <div>4 - Date & Time is calculated based on the local time of the city/destination.</div>
          <div>5 - Use the Airline PNR for all Correspondence directly with the Airline</div>
          <div>6 - For rescheduling/cancellation within 4 hours of the departure time contact the airline directly</div>
          <div>7 - Your ability to travel is at the sole discretion of the airport authorities and we shall not be held responsible.</div>
        </div>
      </div>

      {/* ========================================================
          DANGEROUS GOODS & HAND BAGGAGE ONLY INFO (CLONED)
          ======================================================== */}
      <div className="bg-white text-left grid grid-cols-12 gap-2 text-[10px]">
        
        {/* Dangerous Goods (Banned) */}
        <div className="col-span-7 pr-4 border-r border-gray-200">
          <div className="flex items-center space-x-2 text-red-600 mb-4">
            {/* Thick Red Cross */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <div className="text-[10px] font-bold text-black leading-tight">
              The items are Dangerous Goods and are not permitted<br />
              to be carried as Hand/Check-in Baggage
            </div>
          </div>

          <div className="grid grid-cols-4 gap-x-2 gap-y-4 text-gray-800">
            {[
              { name: 'Lighters', icon: WarningIcons.Lighters },
              { name: 'Flammable Liquids', icon: WarningIcons.Liquids },
              { name: 'Toxic', icon: WarningIcons.Toxic },
              { name: 'Bleach', icon: WarningIcons.Bleach },
              { name: 'Explosives', icon: WarningIcons.Explosives },
              { name: 'Infectious Substances', icon: WarningIcons.Infectious },
              { name: 'Pepper Spray', icon: WarningIcons.Spray },
              { name: 'RadioActive Materials', icon: WarningIcons.Radioactive },
              { name: 'Flammable Gas', icon: WarningIcons.Gas },
              { name: 'Corrosive', icon: WarningIcons.Corrosive }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center space-x-1.5">
                <div className="flex-shrink-0"><item.icon /></div>
                <span className="text-[9px] text-gray-700 leading-tight font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hand Baggage Only */}
        <div className="col-span-5 pl-4">
          <div className="flex items-center space-x-2 text-green-600 mb-4">
            {/* Thick Green Checkmark */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <div className="text-[10px] font-bold text-black leading-tight">
              Items allowed only in Hand Baggage
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-2 text-gray-800">
            {[
              { name: 'Power Banks', icon: WarningIcons.PowerBank },
              { name: 'Lithium Batteries', icon: WarningIcons.Battery }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center space-x-1.5">
                <div className="flex-shrink-0"><item.icon /></div>
                <span className="text-[9px] text-gray-700 leading-tight font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
