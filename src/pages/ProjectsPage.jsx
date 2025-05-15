import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const navigate = useNavigate();

  // Ambil data dari localStorage saat pertama kali render
  useEffect(() => {
    const stored = localStorage.getItem('projects');
    console.log('🔄 useEffect[] | Loaded from localStorage:', stored);
    if (stored) {
      setProjects(JSON.parse(stored));
    }
  }, []);

  // Simpan ke localStorage setiap kali projects berubah
  useEffect(() => {
    console.log('💾 useEffect[projects] | Saving to localStorage:', projects);
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const handleAddProject = (e) => {
    e.preventDefault();

    if (!newTitle.trim()) {
      alert('Judul tidak boleh kosong');
      return;
    }

    const newProject = {
      id: Date.now(),
      title: newTitle.trim(),
    };

    const updatedProjects = [...projects, newProject];

    // Simpan langsung ke localStorage biar gak nunggu useEffect
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
    setNewTitle('');

    console.log('📌 Saved project to localStorage:', updatedProjects);

    // Delay sebentar supaya data ke-load aman
    setTimeout(() => {
      navigate(`/projects/${newProject.id}`);
    }, 300);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📚 Daftar Proyek</h1>

      <form onSubmit={handleAddProject} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Judul proyek"
          className="border p-2 rounded w-full"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
          Tambah
        </button>
      </form>

      {projects.length === 0 ? (
        <p className="text-gray-500">Belum ada proyek ditambahkan.</p>
      ) : (
        <ul className="space-y-2">
          {projects.map((project) => (
            <li key={project.id}>
              <Link
                to={`/projects/${project.id}`}
                className="block bg-white shadow p-4 rounded hover:bg-gray-50"
              >
                {project.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectsPage;
