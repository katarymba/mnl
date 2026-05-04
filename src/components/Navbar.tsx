import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronDown, User, Settings, LogOut, BookOpen, BarChart2, Download, Sigma } from 'lucide-react'

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Sigma className="w-7 h-7 text-indigo-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              MathGen AI
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/generator" className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors text-sm font-medium">
              <Sigma className="w-4 h-4" /> Генератор
            </Link>
            <Link to="/library" className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors text-sm font-medium">
              <BookOpen className="w-4 h-4" /> Библиотека
            </Link>
            <Link to="/progress" className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors text-sm font-medium">
              <BarChart2 className="w-4 h-4" /> Прогресс
            </Link>
            <Link to="/export" className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors text-sm font-medium">
              <Download className="w-4 h-4" /> Экспорт
            </Link>
          </div>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 transition-colors rounded-full pl-1 pr-3 py-1"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-sm font-bold">
                А
              </div>
              <span className="text-sm text-slate-300">Алексей</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden">
                <button
                  onClick={() => { navigate('/profile'); setDropdownOpen(false) }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <User className="w-4 h-4" /> Профиль
                </button>
                <button
                  onClick={() => { navigate('/admin'); setDropdownOpen(false) }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <Settings className="w-4 h-4" /> Панель преподавателя
                </button>
                <hr className="border-slate-700" />
                <button
                  onClick={() => { navigate('/'); setDropdownOpen(false) }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-slate-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Выйти
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
