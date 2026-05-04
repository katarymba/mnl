import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { CheckCircle, Percent, Flame, Clock, Sigma, BookOpen, TrendingUp } from 'lucide-react'

const STATS = [
  { label: 'Решено заданий', value: '47', icon: <CheckCircle className="w-5 h-5" />, color: 'from-indigo-500 to-blue-500' },
  { label: 'Правильных ответов', value: '78%', icon: <Percent className="w-5 h-5" />, color: 'from-violet-500 to-purple-500' },
  { label: 'Серия дней', value: '5 дней', icon: <Flame className="w-5 h-5" />, color: 'from-orange-500 to-red-500' },
  { label: 'Время обучения', value: '12.4 ч', icon: <Clock className="w-5 h-5" />, color: 'from-emerald-500 to-teal-500' },
]

const RECENT = [
  { id: 1, expr: '∫₀¹ x² dx', topic: 'Интегралы', result: 'Верно', time: '2 мин', date: '04.05.2025' },
  { id: 2, expr: 'lim(x→0) sin(x)/x', topic: 'Пределы', result: 'Верно', time: '1 мин', date: '04.05.2025' },
  { id: 3, expr: "d/dx[x³·eˣ]", topic: 'Производные', result: 'Неверно', time: '5 мин', date: '03.05.2025' },
  { id: 4, expr: '∑(1/n²)', topic: 'Ряды', result: 'Верно', time: '3 мин', date: '03.05.2025' },
  { id: 5, expr: "y'' + y = 0", topic: 'Диф. уравнения', result: 'Верно', time: '7 мин', date: '02.05.2025' },
]

const TOPICS_PROGRESS = [
  { name: 'Пределы', val: 85, done: 18 },
  { name: 'Производные', val: 70, done: 14 },
  { name: 'Интегралы', val: 60, done: 9 },
  { name: 'Ряды', val: 40, done: 4 },
  { name: 'Диф. уравнения', val: 20, done: 2 },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-slate-400 text-sm mb-1">Добро пожаловать</p>
          <h1 className="text-3xl font-bold text-white">Алексей Иванов 👋</h1>
          <p className="text-slate-400 mt-1">Группа МТ-301 · МГТУ им. Баумана</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STATS.map((s) => (
            <div key={s.label} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-5">
              <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${s.color} mb-3`}>
                {s.icon}
              </div>
              <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
              <div className="text-sm text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent activity */}
          <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              Последняя активность
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-slate-500 uppercase tracking-wider border-b border-slate-700">
                    <th className="text-left pb-3">Задание</th>
                    <th className="text-left pb-3">Тема</th>
                    <th className="text-left pb-3">Результат</th>
                    <th className="text-left pb-3">Время</th>
                    <th className="text-left pb-3">Дата</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {RECENT.map(r => (
                    <tr key={r.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="py-3 font-mono text-sm text-indigo-300">{r.expr}</td>
                      <td className="py-3">
                        <span className="text-xs bg-slate-700 text-slate-300 rounded-full px-2.5 py-1">{r.topic}</span>
                      </td>
                      <td className="py-3">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${r.result === 'Верно' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                          {r.result}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-slate-400">{r.time}</td>
                      <td className="py-3 text-sm text-slate-500">{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Progress by topic */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-5">Прогресс по разделам</h2>
            <div className="space-y-4">
              {TOPICS_PROGRESS.map(t => (
                <div key={t.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-slate-300">{t.name}</span>
                    <span className="text-sm text-indigo-400 font-medium">{t.val}%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all"
                      style={{ width: `${t.val}%` }}
                    />
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{t.done} заданий выполнено</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <Link
            to="/generator"
            className="flex items-center gap-4 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/30 hover:border-indigo-500/50 rounded-2xl p-5 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0">
              <Sigma className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-semibold text-white group-hover:text-indigo-300 transition-colors">Генератор заданий</div>
              <div className="text-sm text-slate-400">Создать новые задания с помощью ИИ</div>
            </div>
          </Link>
          <Link
            to="/library"
            className="flex items-center gap-4 bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/30 hover:border-violet-500/50 rounded-2xl p-5 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-semibold text-white group-hover:text-violet-300 transition-colors">Библиотека заданий</div>
              <div className="text-sm text-slate-400">Просмотр и поиск задач</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
