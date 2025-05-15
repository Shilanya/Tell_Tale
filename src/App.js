import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ChapterPage from './pages/ChapterPage';
import NotesPage from './pages/NotesPage';
import TimelinePage from './pages/TimelinePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/projects/:id/chapters" element={<ChapterPage />} />
        <Route path="/projects/:id/notes" element={<NotesPage />} />
        <Route path="/projects/:id/timeline" element={<TimelinePage />} />
      </Routes>
    </Router>
  );
}

export default App;
