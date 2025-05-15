import React, { useState } from 'react';

const TimelineForm = ({ onAddEvent }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      id: Date.now(),
      title,
      description,
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
    };

    onAddEvent(newEvent);

    // reset
    setTitle('');
    setDescription('');
    setYear('');
    setMonth(1);
    setDay(1);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">Tambah Event Timeline</h2>

      <div className="mb-3">
        <label className="block font-medium">Judul Event</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="block font-medium">Deskripsi</label>
        <textarea
          className="w-full border p-2 rounded"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block font-medium">Tahun</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
          <p className="text-sm text-gray-500">Bisa pakai angka negatif</p>
        </div>

        <div>
          <label className="block font-medium">Bulan (1–12)</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            min={1}
            max={12}
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Hari (1–30)</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            min={1}
            max={30}
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </div>
      </div>

      <button type="submit" className="bg-yellow-600 text-white px-4 py-2 rounded">
        Tambah Event
      </button>
    </form>
  );
};

export default TimelineForm;
