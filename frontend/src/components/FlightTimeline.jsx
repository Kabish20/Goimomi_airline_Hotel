import React from 'react';

export default function FlightTimeline({ segments }) {
  if (!segments || segments.length === 0) return null;

  return (
    <div className="space-y-6">
      {segments.map((seg, index) => {
        const depDate = new Date(seg.departure.time);
        const arrDate = new Date(seg.arrival.time);

        // Format dates: e.g. "Tue, 23 Jun '26, 08:15"
        const formatFlightTime = (dateObj) => {
          const options = { 
            weekday: 'short', 
            day: '2-digit', 
            month: 'short', 
            year: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false
          };
          // Adjust string matching the screenshot format
          const formatted = dateObj.toLocaleDateString('en-GB', options);
          // e.g. "Tue, 23 Jun 26, 08:15"
          return formatted.replace(/(\d{4})/, "'$1").replace(/\//g, '-');
        };

        return (
          <div key={seg.sequence} className="relative">
            {/* Main Flight Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden transition-all duration-300 hover:border-oman-gold/40 hover:shadow-oman-gold/5">
              
              {/* Airline PNR Header (Top Right) */}
              <div className="absolute top-0 right-0 bg-slate-950 border-l border-b border-slate-800 px-4 py-2 rounded-bl-xl flex flex-col items-end">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Airline PNR</span>
                <span className="text-sm font-bold text-oman-gold font-mono">ONFDOJ</span>
              </div>

              {/* Top summary row */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-oman-gold/10 border border-oman-gold/30 flex items-center justify-center text-oman-gold font-bold text-sm">
                  WY
                </div>
                <div>
                  <h4 className="font-bold text-slate-200 text-lg leading-tight">{seg.airline_name}</h4>
                  <p className="text-xs text-slate-400 font-mono">{seg.airline_code} - {seg.flight_number}</p>
                </div>
              </div>

              {/* Itinerary Details grid */}
              <div className="grid grid-cols-1 md:grid-cols-7 gap-6 items-center">
                
                {/* Departure Location */}
                <div className="md:col-span-2 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Departure</span>
                  <div className="text-base font-bold text-slate-200">
                    {formatFlightTime(depDate)}
                  </div>
                  <div className="text-sm font-semibold text-slate-300">{seg.departure.city}, {seg.departure.country}</div>
                  <div className="text-xs text-slate-400">
                    {seg.departure.airport} {seg.departure.terminal ? `• ${seg.departure.terminal}` : ''}
                  </div>
                </div>

                {/* Direct / Non-Stop indicator */}
                <div className="md:col-span-3 flex flex-col items-center justify-center px-4">
                  <span className="text-xs font-semibold text-oman-gold/80 mb-1">Non-Stop</span>
                  <div className="w-full flex items-center justify-center relative">
                    <div className="h-[2px] bg-slate-800 w-full relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-oman-gold"></div>
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-700"></div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 font-mono mt-1">{seg.duration}</span>
                </div>

                {/* Arrival Location */}
                <div className="md:col-span-2 space-y-1 text-left md:text-right">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Arrival</span>
                  <div className="text-base font-bold text-slate-200">
                    {formatFlightTime(arrDate)}
                  </div>
                  <div className="text-sm font-semibold text-slate-300">{seg.arrival.city}, {seg.arrival.country}</div>
                  <div className="text-xs text-slate-400">
                    {seg.arrival.airport} {seg.arrival.terminal ? `• ${seg.arrival.terminal}` : ''}
                  </div>
                </div>

              </div>

              {/* Bottom Metadata */}
              <div className="mt-6 pt-4 border-t border-slate-800/60 flex flex-wrap justify-between items-center text-xs text-slate-400 gap-4">
                <div className="flex space-x-6">
                  <div>
                    <span className="text-slate-500">Cabin Class: </span>
                    <span className="font-semibold text-slate-300">{seg.cabin_class}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Fare Type: </span>
                    <span className="font-semibold text-slate-300">{seg.fare_type}</span>
                  </div>
                </div>
                
                <div className="flex space-x-4 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
                  <div>
                    <span className="text-slate-500">Check-in: </span>
                    <span className="font-bold text-slate-300">{seg.baggage.check_in}</span>
                  </div>
                  <div className="w-[1px] h-4 bg-slate-800"></div>
                  <div>
                    <span className="text-slate-500">Cabin: </span>
                    <span className="font-bold text-slate-300">{seg.baggage.cabin}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Layover Timer Card */}
            {seg.layover && (
              <div className="my-4 flex justify-center items-center">
                <div className="flex items-center space-x-2 bg-gradient-to-r from-oman-navy-light/40 to-slate-900 border border-slate-800/80 rounded-xl px-5 py-2 text-xs font-semibold text-slate-400 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-oman-gold animate-pulse"></span>
                  <span className="text-slate-500 font-medium">Layover Connection</span>
                  <span className="text-oman-gold font-bold font-mono">({seg.layover.duration})</span>
                  <span className="text-slate-500 font-medium">at {seg.arrival.city} ({seg.arrival.airport})</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
