import React from 'react';

export default function PassengerDetails({ passengers }) {
  if (!passengers || passengers.length === 0) return null;

  const renderSingleBarcode = (idx) => {
    return (
      <div className="bg-white p-2 rounded shadow border border-slate-200 inline-block text-left">
        {/* Simulated PDF417/Linear Barcode */}
        <div className="h-10 w-64 flex items-stretch">
          {Array.from({ length: 90 }).map((_, barIdx) => {
            const val = Math.sin(barIdx * 0.4 + idx) + Math.cos(barIdx * 0.7 - idx);
            const isDark = val > -0.2;
            return (
              <div
                key={barIdx}
                className={`flex-grow ${isDark ? 'bg-slate-900' : 'bg-transparent'}`}
                style={{ width: isDark ? (val > 0.5 ? '3px' : '1px') : '2px' }}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-slate-200 flex items-center space-x-2">
          <span>Passenger Details</span>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-oman-gold/15 text-oman-gold border border-oman-gold/20">
            {passengers.length} {passengers.length === 1 ? 'Traveler' : 'Travelers'}
          </span>
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-800/80 text-sm">
          <thead>
            <tr className="text-[10px] text-slate-500 uppercase tracking-widest text-left font-bold bg-slate-950/40">
              <th scope="col" className="px-4 py-3 rounded-l-lg w-12 text-center">Sr.</th>
              <th scope="col" className="px-4 py-3">Name, DOB, Passport, & FF</th>
              <th scope="col" className="px-4 py-3">PNR & Ticket No.</th>
              <th scope="col" className="px-4 py-3 rounded-r-lg">Meal, Baggage, Seat & Other Preference</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {passengers.map((passenger, idx) => (
              <tr key={idx} className="hover:bg-slate-800/20 transition-colors">
                <td className="px-4 py-5 text-center font-mono font-bold text-slate-400">
                  {idx + 1}
                </td>
                <td className="px-4 py-5 space-y-2 text-left">
                  <div className="font-bold text-slate-200 text-sm">{passenger.full_name}</div>
                  <div className="text-xs text-slate-400 flex flex-wrap gap-x-4">
                    <span><strong className="text-slate-500">DOB:</strong> {passenger.date_of_birth || '15/01/1967'}</span>
                    {passenger.other_info && (
                      <span className="text-slate-400 font-semibold">{passenger.other_info}</span>
                    )}
                  </div>
                  <div className="pt-2">
                    {renderSingleBarcode(idx)}
                  </div>
                </td>
                <td className="px-4 py-5 font-mono text-xs">
                  {passenger.segment_specific_details && passenger.segment_specific_details.length > 0 ? (
                    <div className="space-y-1 text-slate-300">
                      {passenger.segment_specific_details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex space-x-2">
                          <span className="text-slate-500">{detail.route}:</span>
                          <span className="text-oman-gold font-bold">{detail.pnr}</span>
                          {detail.ticket_number && (
                            <span className="text-slate-400">/ {detail.ticket_number}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-oman-gold font-bold">ONFDOJ</span>
                  )}
                </td>
                <td className="px-4 py-5 text-xs text-slate-400">
                  {passenger.segment_specific_details && passenger.segment_specific_details.some(d => d.preferences && Object.values(d.preferences).some(Boolean)) ? (
                    <div className="space-y-1">
                      {passenger.segment_specific_details.map((detail, dIdx) => (
                        <div key={dIdx} className="text-slate-400">
                          {Object.entries(detail.preferences).some(([_, val]) => val) && (
                            <div>
                              <strong className="text-slate-500">{detail.route}: </strong>
                              {detail.preferences.meal && `Meal: ${detail.preferences.meal}; `}
                              {detail.preferences.seat && `Seat: ${detail.preferences.seat}; `}
                              {detail.preferences.baggage && `Baggage: ${detail.preferences.baggage}; `}
                              {detail.preferences.other && `Other: ${detail.preferences.other}`}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
