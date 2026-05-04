import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import GeneratorPage from './pages/GeneratorPage'
import TaskViewPage from './pages/TaskViewPage'
import LibraryPage from './pages/LibraryPage'
import DashboardPage from './pages/DashboardPage'
import ProgressPage from './pages/ProgressPage'
import ExportPage from './pages/ExportPage'
import AdminPanel from './pages/AdminPanel'
import ProfilePage from './pages/ProfilePage'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/generator" element={<GeneratorPage />} />
        <Route path="/tasks/:id" element={<TaskViewPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/export" element={<ExportPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  )
}
