import Navbar from '../components/Navbar'
import { TrendingUp, AlertTriangle, BookOpen } from 'lucide-react'

const TOPICS = [
  { name: 'Пределы', done: 18, total: 25, accuracy: 89, avgTime: '2.1 мин', color: 'from-indigo-500 to-blue-500' },
  { name: 'Производные', done: 14, total: 25, accuracy: 74, avgTime: '3.5 мин', color: 'from-violet-500 to-purple-500' },
  { name: 'Интегралы', done: 9, total: 25, accuracy: 67, avgTime: '4.8 мин', color: 'from-purple-500 to-pink-500' },
  { name: 'Ряды', done: 4, total: 25, accuracy: 50, avgTime: '6.2 мин', color: 'from-orange-500 to-red-500' },
  { name: 'Диф. уравнения', done: 2, total: 25, accuracy: 33, avgTime: '8.4 мин', color: 'from-red-500 to-rose-500' },
]

const WEAK = [
  { topic: 'Диф. уравнения', score: 33, tip: 'Повторите методы решения ОДУ первого порядка' },
  { topic: 'Ряды', score: 50, tip: 'Изучите признаки сходимости числовых рядов' },
  { topic: 'Интегралы', score: 67, tip: 'Отработайте интегрирование по частям и подстановку' },
]

// Generate heatmap data (last 12 weeks × 7 days)
const HEATMAP = Array.from({ length: 84 }, () => {
  const r = Math.random()
  if (r < 0.35) return 0
  if (r < 0.55) return 1
  if (r < 0.75) return 2
  if (r < 0.90) return 3
  return 4
})

const HEAT_COLORS = ['bg-slate-800', 'bg-indigo-900', 'bg-indigo-700', 'bg-indigo-500', 'bg-violet-400']

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-indigo-400" />
            Прогресс по разделам
          </h1>
          <p className="text-slate-400">Детальная статистика вашего обучения</p>
        </div>

        {/* Topic breakdown */}
        <div className="grid gap-4 mb-8">
          {TOPICS.map((t) => (
            <div key={t.name} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="sm:w-40 flex-shrink-0">
                  <div className="font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{t.done}/{t.total} заданий</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-slate-400">Выполнено</span>
                    <span className="text-xs font-medium text-white">{Math.round(t.done / t.total * 100)}%</span>
                  </div>
                  <div className="h-2.5 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${t.color} rounded-full`}
                      style={{ width: `${Math.round(t.done / t.total * 100)}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6 sm:w-56 flex-shrink-0">
                  <div className="text-center">
                    <div className={`text-xl font-bold ${t.accuracy >= 70 ? 'text-green-400' : t.accuracy >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {t.accuracy}%
                    </div>
                    <div className="text-xs text-slate-500">Точность</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">{t.avgTime}</div>
                    <div className="text-xs text-slate-500">Ср. время</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Activity heatmap */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Активность за 12 недель</h2>
          <div className="flex gap-1 flex-wrap">
            {HEATMAP.map((level, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-sm ${HEAT_COLORS[level]} transition-all hover:ring-1 hover:ring-indigo-400 cursor-default`}
                title={`${level} задания`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
            <span>Меньше</span>
            {HEAT_COLORS.map((c, i) => (
              <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
            ))}
            <span>Больше</span>
          </div>
        </div>

        {/* Weak spots */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            Слабые места
          </h2>
          <p className="text-slate-400 text-sm mb-5">Разделы, требующие дополнительной практики</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {WEAK.map((w) => (
              <div key={w.topic} className="bg-slate-900/60 border border-yellow-500/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <span className="font-semibold text-white text-sm">{w.topic}</span>
                </div>
                <div className="text-2xl font-bold text-yellow-400 mb-1">{w.score}%</div>
                <div className="text-xs text-slate-400 mb-3 leading-relaxed">{w.tip}</div>
                <button className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                  <BookOpen className="w-3.5 h-3.5" />
                  Перейти к заданиям
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
