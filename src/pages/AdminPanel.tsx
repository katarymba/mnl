import { useState } from 'react'
import Navbar from '../components/Navbar'
import { Users, FileText, BarChart2, Settings, CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react'

const STUDENTS = [
  { name: 'Иванов Алексей', group: 'МТ-301', done: 47, lastActive: '04.05.2025', status: 'online' },
  { name: 'Петрова Мария', group: 'МТ-301', done: 31, lastActive: '04.05.2025', status: 'online' },
  { name: 'Сидоров Дмитрий', group: 'МТ-302', done: 15, lastActive: '03.05.2025', status: 'offline' },
  { name: 'Козлова Анна', group: 'МТ-302', done: 52, lastActive: '04.05.2025', status: 'online' },
  { name: 'Новиков Сергей', group: 'МТ-301', done: 8, lastActive: '01.05.2025', status: 'inactive' },
  { name: 'Морозова Елена', group: 'МТ-303', done: 39, lastActive: '04.05.2025', status: 'online' },
  { name: 'Васильев Павел', group: 'МТ-303', done: 24, lastActive: '02.05.2025', status: 'offline' },
  { name: 'Фёдорова Ольга', group: 'МТ-302', done: 61, lastActive: '04.05.2025', status: 'online' },
]

const PENDING_TASKS = [
  { id: 1, topic: 'Интегралы', expr: '∫₀² e²ˣ dx', difficulty: 4, type: 'Вычислительная', status: 'pending' },
  { id: 2, topic: 'Ряды', expr: '∑ n/(2ⁿ)', difficulty: 3, type: 'Доказательство', status: 'pending' },
  { id: 3, topic: 'Пределы', expr: 'lim(x→π) sin(x)/(π-x)', difficulty: 2, type: 'Вычислительная', status: 'approved' },
]

const TOPIC_AVERAGES = [
  { name: 'Пределы', avg: 82 },
  { name: 'Производные', avg: 75 },
  { name: 'Интегралы', avg: 63 },
  { name: 'Ряды', avg: 48 },
  { name: 'Диф. ур.', avg: 35 },
]

const STATUS_BADGE: Record<string, string> = {
  online: 'bg-green-500/10 text-green-400 border border-green-500/30',
  offline: 'bg-slate-500/10 text-slate-400 border border-slate-600',
  inactive: 'bg-red-500/10 text-red-400 border border-red-500/30',
}
const STATUS_LABEL: Record<string, string> = {
  online: 'Онлайн',
  offline: 'Офлайн',
  inactive: 'Неактивен',
}

const TABS = [
  { id: 'students', label: 'Студенты', icon: <Users className="w-4 h-4" /> },
  { id: 'tasks', label: 'Задания', icon: <FileText className="w-4 h-4" /> },
  { id: 'stats', label: 'Статистика', icon: <BarChart2 className="w-4 h-4" /> },
  { id: 'settings', label: 'Настройки', icon: <Settings className="w-4 h-4" /> },
]

export default function AdminPanel() {
  const [tab, setTab] = useState('students')
  const [tasks, setTasks] = useState(PENDING_TASKS)

  const approveTask = (id: number) => setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'approved' } : t))
  const rejectTask = (id: number) => setTasks(prev => prev.filter(t => t.id !== id))

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Панель преподавателя</h1>
          <p className="text-slate-400">Управление студентами, заданиями и статистикой</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-1.5 w-fit">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${tab === t.id ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Students tab */}
        {tab === 'students' && (
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-700">
              <h2 className="font-semibold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-400" />
                Список студентов ({STUDENTS.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/40">
                  <tr className="text-xs text-slate-500 uppercase tracking-wider">
                    <th className="text-left px-6 py-3">Студент</th>
                    <th className="text-left px-6 py-3">Группа</th>
                    <th className="text-left px-6 py-3">Выполнено</th>
                    <th className="text-left px-6 py-3">Последняя активность</th>
                    <th className="text-left px-6 py-3">Статус</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {STUDENTS.map((s) => (
                    <tr key={s.name} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white">
                            {s.name[0]}
                          </div>
                          <span className="text-sm text-white font-medium">{s.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">{s.group}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" style={{ width: `${Math.min(100, s.done / 0.65)}%` }} />
                          </div>
                          <span className="text-sm text-slate-300">{s.done}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400 flex items-center gap-1.5 mt-3">
                        <Clock className="w-3.5 h-3.5" />{s.lastActive}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_BADGE[s.status]}`}>
                          {STATUS_LABEL[s.status]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tasks tab */}
        {tab === 'tasks' && (
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-700">
              <h2 className="font-semibold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                Сгенерированные задания на проверке
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900/40">
                  <tr className="text-xs text-slate-500 uppercase tracking-wider">
                    <th className="text-left px-6 py-3">Задание</th>
                    <th className="text-left px-6 py-3">Тема</th>
                    <th className="text-left px-6 py-3">Тип</th>
                    <th className="text-left px-6 py-3">Статус</th>
                    <th className="text-left px-6 py-3">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {tasks.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 font-mono text-indigo-300">{t.expr}</td>
                      <td className="px-6 py-4 text-sm text-slate-300">{t.topic}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">{t.type}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${t.status === 'approved' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                          {t.status === 'approved' ? 'Одобрено' : 'На проверке'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {t.status === 'pending' && (
                          <div className="flex gap-2">
                            <button onClick={() => approveTask(t.id)} className="p-1.5 text-green-400 hover:text-green-300 hover:bg-green-500/10 rounded-lg transition-all">
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button onClick={() => rejectTask(t.id)} className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all">
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Stats tab */}
        {tab === 'stats' && (
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6">
            <h2 className="font-semibold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              Средний балл группы по разделам
            </h2>
            <div className="space-y-4">
              {TOPIC_AVERAGES.map((t) => (
                <div key={t.name} className="flex items-center gap-4">
                  <div className="w-32 text-sm text-slate-300 flex-shrink-0">{t.name}</div>
                  <div className="flex-1 h-8 bg-slate-900/60 rounded-xl overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-xl flex items-center justify-end pr-3 transition-all"
                      style={{ width: `${t.avg}%` }}
                    >
                      <span className="text-xs text-white font-bold">{t.avg}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings tab */}
        {tab === 'settings' && (
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6">
              <h2 className="font-semibold text-white mb-5 flex items-center gap-2">
                <Settings className="w-5 h-5 text-indigo-400" />
                Параметры генерации
              </h2>
              <div className="space-y-4">
                {[
                  { label: 'Макс. сложность', val: 5, max: 5 },
                  { label: 'Заданий на тему', val: 10, max: 30 },
                  { label: 'Попыток на задание', val: 3, max: 10 },
                ].map(item => (
                  <div key={item.label}>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      {item.label}: <span className="text-indigo-400">{item.val}</span>
                    </label>
                    <input type="range" min={1} max={item.max} defaultValue={item.val} className="w-full accent-indigo-500" />
                  </div>
                ))}
                <button className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white font-medium py-2.5 rounded-xl transition-all text-sm mt-2">
                  Сохранить настройки
                </button>
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6">
              <h2 className="font-semibold text-white mb-5">Настройки сложности</h2>
              <div className="space-y-3">
                {['Пределы', 'Производные', 'Интегралы', 'Ряды', 'Диф. уравнения'].map(t => (
                  <div key={t} className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">{t}</span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(s => (
                        <div key={s} className={`w-6 h-6 rounded border text-xs flex items-center justify-center cursor-pointer transition-all ${s <= 3 ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-300' : 'border-slate-700 text-slate-600 hover:border-slate-600'}`}>
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
