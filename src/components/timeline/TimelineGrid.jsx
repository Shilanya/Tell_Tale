import React, { useState } from 'react';

const TimelineGrid = ({ events }) => {
  const [selectedYear, setSelectedYear] = useState(null);

  // Ambil semua tahun unik dari event
  const uniqueYears = [...new Set(events.map((e) => e.year))].sort((a, b) => a - b);

  // Filter event sesuai tahun yang dipilih
  const filteredEvents = events.filter((e) => e.year === selectedYear);

  // Buat struktur grid: [bulan][hari]
  const grid = Array.from({ length: 12 }, () =>
    Array.from({ length: 30 }, () => null)
  );

  filteredEvents.forEach((event) => {
    const monthIndex = event.month - 1;
    const dayIndex = event.day - 1;
    grid[monthIndex][dayIndex] = event.title;
  });

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">🗓 Tampilan Grid Timeline</h2>

      {uniqueYears.length === 0 ? (
        <p className="text-gray-500">Belum ada data untuk ditampilkan.</p>
      ) : (
        <>
          <div className="mb-4">
            <label className="mr-2 font-medium">Pilih Tahun:</label>
            <select
              className="border p-2 rounded"
              value={selectedYear ?? ''}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            >
              <option value="">-- Pilih Tahun --</option>
              {uniqueYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {selectedYear !== null && (
            <div className="overflow-auto">
              <div className="grid grid-cols-12 gap-2 text-sm">
                {grid.map((days, monthIndex) => (
                  <div key={monthIndex}>
                    <div className="text-center font-bold mb-1">
                      Bulan {monthIndex + 1}
                    </div>
                    <div className="grid grid-rows-30 gap-1">
                      {days.map((event, dayIndex) => (
                        <div
                          key={dayIndex}
                          className={`border h-8 px-2 py-1 rounded ${
                            event ? 'bg-yellow-200' : 'bg-gray-50'
                          }`}
                          title={event ?? `Hari ${dayIndex + 1}`}
                        >
                          {event ? `📌 ${event}` : ''}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TimelineGrid;
