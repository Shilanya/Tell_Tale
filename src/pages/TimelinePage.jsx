import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import TimelineForm from '../components/timeline/TimelineForm';
import TimelineList from '../components/timeline/TimelineList';
import TimelineGrid from '../components/timeline/TimelineGrid';

const TimelinePage = () => {
  const { id } = useParams();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(`timeline_${id}`);
    if (stored) {
      setEvents(JSON.parse(stored));
    }
  }, [id]);

  useEffect(() => {
    localStorage.setItem(`timeline_${id}`, JSON.stringify(events));
  }, [id, events]);

  const handleAddEvent = (event) => {
    setEvents([...events, event]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📅 Timeline Proyek #{id}</h1>
      <Link to={`/projects/${id}`} className="text-blue-500 underline inline-block mb-4">
        ⬅ Kembali ke Detail Proyek
      </Link>
      <TimelineForm onAddEvent={handleAddEvent} />
      <TimelineList events={events} />
      <TimelineGrid events={events} />
    </div>
  );
};

export default TimelinePage;
