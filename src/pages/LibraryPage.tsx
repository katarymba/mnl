import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Search, Star, ChevronRight, ChevronLeft, Filter } from 'lucide-react'

const TOPICS = ['Все темы', 'Пределы', 'Производные', 'Интегралы', 'Ряды', 'Диф. уравнения']
const DIFFICULTIES = ['Любая', '1', '2', '3', '4', '5']
const TYPES = ['Все типы', 'Вычислительная', 'Доказательство', 'Практическая']

const TASKS = [
  { id: 1, topic: 'Интегралы', type: 'Вычислительная', difficulty: 2, expr: '∫₀¹ x² dx', preview: 'Вычислите определённый интеграл' },
  { id: 2, topic: 'Пределы', type: 'Вычислительная', difficulty: 1, expr: 'lim(x→0) sin(x)/x', preview: 'Найдите предел' },
  { id: 3, topic: 'Производные', type: 'Вычислительная', difficulty: 3, expr: "d/dx[x³·eˣ]", preview: 'Найдите производную произведения' },
  { id: 4, topic: 'Ряды', type: 'Доказательство', difficulty: 4, expr: '∑(1/n²)', preview: 'Исследуйте сходимость ряда' },
  { id: 5, topic: 'Диф. уравнения', type: 'Практическая', difficulty: 5, expr: "y'' + 2y' + y = 0", preview: 'Решите линейное ДУ 2-го порядка' },
  { id: 6, topic: 'Интегралы', type: 'Вычислительная', difficulty: 3, expr: '∫ x·sin(x) dx', preview: 'Интегрирование по частям' },
  { id: 7, topic: 'Пределы', type: 'Вычислительная', difficulty: 2, expr: 'lim(x→∞) (1+1/x)ˣ', preview: 'Второй замечательный предел' },
  { id: 8, topic: 'Производные', type: 'Практическая', difficulty: 2, expr: 'f(x) = ln(x²+1)', preview: 'Найдите производную сложной функции' },
  { id: 9, topic: 'Ряды', type: 'Доказательство', difficulty: 3, expr: '∑(xⁿ/n!)', preview: 'Найдите радиус сходимости' },
  { id: 10, topic: 'Интегралы', type: 'Вычислительная', difficulty: 4, expr: '∫₀^π sin²(x) dx', preview: 'Интеграл тригонометрической функции' },
  { id: 11, topic: 'Пределы', type: 'Вычислительная', difficulty: 3, expr: 'lim(x→0) (eˣ-1)/x', preview: 'Эквивалентность бесконечно малых' },
  { id: 12, topic: 'Производные', type: 'Доказательство', difficulty: 5, expr: '(f·g)ⁿ = ?', preview: 'Формула Лейбница для n-й производной' },
]

export default function LibraryPage() {
  const [search, setSearch] = useState('')
  const [topic, setTopic] = useState('Все темы')
  const [difficulty, setDifficulty] = useState('Любая')
  const [type, setType] = useState('Все типы')
  const [page, setPage] = useState(1)

  const filtered = TASKS.filter(t => {
    if (topic !== 'Все темы' && t.topic !== topic) return false
    if (difficulty !== 'Любая' && t.difficulty !== Number(difficulty)) return false
    if (type !== 'Все типы' && t.type !== type) return false
    if (search && !t.preview.toLowerCase().includes(search.toLowerCase()) && !t.expr.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Библиотека заданий</h1>
          <p className="text-slate-400">Более {TASKS.length} заданий по математическому анализу</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-5">
              <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4 text-indigo-400" /> Фильтры
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Поиск</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Поиск заданий..."
                      className="w-full bg-slate-900 border border-slate-600 focus:border-indigo-500 rounded-xl pl-9 pr-3 py-2 text-white placeholder-slate-500 outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Тема</label>
                  <div className="space-y-1">
                    {TOPICS.map(t => (
                      <button
                        key={t}
                        onClick={() => setTopic(t)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${topic === t ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Сложность</label>
                  <div className="flex flex-wrap gap-2">
                    {DIFFICULTIES.map(d => (
                      <button
                        key={d}
                        onClick={() => setDifficulty(d)}
                        className={`px-3 py-1 rounded-lg text-sm transition-all ${difficulty === d ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-700'}`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Тип</label>
                  <div className="space-y-1">
                    {TYPES.map(t => (
                      <button
                        key={t}
                        onClick={() => setType(t)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${type === t ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tasks grid */}
          <div className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map(task => (
                <div key={task.id} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-5 hover:border-slate-600 transition-all group flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full px-2.5 py-0.5">
                      {task.topic}
                    </span>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} className={`w-3 h-3 ${s <= task.difficulty ? 'text-yellow-400 fill-yellow-400' : 'text-slate-700'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="font-mono text-xl text-indigo-300 mb-2 flex-1">{task.expr}</div>
                  <p className="text-xs text-slate-500 mb-4">{task.preview}</p>
                  <Link
                    to={`/tasks/${task.id}`}
                    className="flex items-center justify-center gap-1.5 w-full py-2 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 hover:border-indigo-500/50 text-indigo-300 rounded-lg text-sm font-medium transition-all group-hover:text-indigo-200"
                  >
                    Открыть <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-slate-500">
                <div className="text-6xl mb-4 opacity-30">∅</div>
                <p>Задания не найдены. Измените фильтры.</p>
              </div>
            )}

            {/* Pagination */}
            {filtered.length > 0 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {[1, 2, 3].map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${page === p ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white' : 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300'}`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage(Math.min(3, page + 1))}
                  className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
