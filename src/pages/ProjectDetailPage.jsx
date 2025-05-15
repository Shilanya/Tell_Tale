import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProjectDetailPage = () => {
  const { id } = useParams(); // ambil id proyek dari URL
  const [project, setProject] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('projects');
    if (stored) {
      const allProjects = JSON.parse(stored);
      const found = allProjects.find((p) => String(p.id) === id);
      setProject(found);
    }
  }, [id]);

  return (
    <div className="p-6">
      <Link
        to="/projects"
        className="text-blue-500 underline mb-4 inline-block"
      >
        ⬅ Kembali ke Daftar Proyek
      </Link>

      <h1 className="text-2xl font-bold mb-4">
        Detail Proyek: {project?.title || `#${id}`}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to={`/projects/${id}/chapters`}
          className="bg-indigo-600 text-white p-4 rounded shadow text-center"
        >
          📖 Bab / Chapter
        </Link>

        <Link
          to={`/projects/${id}/notes`}
          className="bg-green-600 text-white p-4 rounded shadow text-center"
        >
          📝 Notes (Karakter & World)
        </Link>

        <Link
          to={`/projects/${id}/timeline`}
          className="bg-yellow-500 text-white p-4 rounded shadow text-center"
        >
          🗓️ Timeline Cerita
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
