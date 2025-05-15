import React from 'react';

const TimelineList = ({ events }) => {
  if (events.length === 0) {
    return <p className="text-gray-600">Belum ada event timeline ditambahkan.</p>;
  }

  // Urutkan berdasarkan tahun, bulan, hari
  const sorted = [...events].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    if (a.month !== b.month) return a.month - b.month;
    return a.day - b.day;
  });

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Daftar Timeline</h2>
      <ul className="space-y-4">
        {sorted.map((event) => (
          <li key={event.id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-bold">{event.title}</h3>
            <p className="text-sm text-gray-700 mb-2">{event.description}</p>
            <p className="text-sm text-gray-500 italic">
              Tanggal: {event.day} / {event.month} / {event.year}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimelineList;
