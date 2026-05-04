import { useState } from 'react'
import Navbar from '../components/Navbar'
import { Sparkles, Loader2, Star, ChevronRight } from 'lucide-react'

const TOPICS = ['Пределы', 'Производные', 'Интегралы', 'Ряды', 'Дифференциальные уравнения']
const TYPES = ['Вычислительная', 'Доказательство', 'Практическая']

const MOCK_TASKS = [
  {
    id: 1,
    topic: 'Интегралы',
    expr: '∫₀¹ x² dx',
    desc: 'Вычислите определённый интеграл от 0 до 1 функции x²',
    difficulty: 2,
  },
  {
    id: 2,
    topic: 'Пределы',
    expr: 'lim(x→0) sin(x)/x',
    desc: 'Найдите предел отношения синуса к аргументу при стремлении аргумента к нулю',
    difficulty: 1,
  },
  {
    id: 3,
    topic: 'Производные',
    expr: "d/dx [x³ · eˣ]",
    desc: 'Найдите производную произведения степенной и показательной функций',
    difficulty: 3,
  },
]

export default function GeneratorPage() {
  const [topic, setTopic] = useState(TOPICS[0])
  const [difficulty, setDifficulty] = useState(3)
  const [count, setCount] = useState(5)
  const [type, setType] = useState(TYPES[0])
  const [loading, setLoading] = useState(false)
  const [tasks, setTasks] = useState<typeof MOCK_TASKS>([])

  const generate = () => {
    setLoading(true)
    setTasks([])
    setTimeout(() => {
      setTasks(MOCK_TASKS)
      setLoading(false)
    }, 1800)
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Генератор заданий</h1>
          <p className="text-slate-400">Настройте параметры и получите уникальные задания по математическому анализу</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Settings panel */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                Параметры генерации
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Тема</label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-white outline-none transition-all text-sm"
                  >
                    {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Сложность: <span className="text-indigo-400">{difficulty}</span>/5
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button key={s} onClick={() => setDifficulty(s)} className="flex-1">
                        <Star
                          className={`w-7 h-7 mx-auto transition-all ${s <= difficulty ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Количество заданий: <span className="text-indigo-400">{count}</span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={20}
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>1</span><span>20</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Тип задания</label>
                  <div className="space-y-2">
                    {TYPES.map((t) => (
                      <label key={t} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${type === t ? 'border-indigo-500' : 'border-slate-600 group-hover:border-slate-500'}`}>
                          {type === t && <div className="w-2 h-2 rounded-full bg-indigo-500" />}
                        </div>
                        <input type="radio" name="type" value={t} checked={type === t} onChange={() => setType(t)} className="sr-only" />
                        <span className={`text-sm transition-colors ${type === t ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'}`}>{t}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={generate}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 disabled:opacity-70 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-500/25 mt-2"
                >
                  {loading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Генерация...</>
                  ) : (
                    <><Sparkles className="w-5 h-5" /> Сгенерировать задания</>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Results panel */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 min-h-96">
              <h2 className="text-lg font-semibold text-white mb-6">Сгенерированные задания</h2>

              {loading && (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-slate-700 border-t-indigo-500 animate-spin" />
                    <div className="absolute inset-2 w-12 h-12 rounded-full border-4 border-slate-700 border-b-violet-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
                  </div>
                  <p className="text-slate-400 text-sm">ИИ генерирует задания...</p>
                  <div className="flex gap-2">
                    {['∫', '∂', '∑', 'lim', '∇'].map((s, i) => (
                      <span key={s} className="text-indigo-400 font-mono text-lg animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {!loading && tasks.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="text-6xl mb-4 opacity-30">∫</div>
                  <p className="text-slate-400">Настройте параметры и нажмите «Сгенерировать задания»</p>
                </div>
              )}

              {!loading && tasks.length > 0 && (
                <div className="space-y-4">
                  {tasks.map((task, i) => (
                    <div key={task.id} className="bg-slate-900/60 border border-slate-700 rounded-xl p-5 hover:border-slate-600 transition-all group">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-slate-500">#{i + 1}</span>
                          <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full px-2.5 py-0.5">
                            {task.topic}
                          </span>
                          <div className="flex gap-0.5">
                            {[1,2,3,4,5].map(s => (
                              <Star key={s} className={`w-3 h-3 ${s <= task.difficulty ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} />
                            ))}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
                      </div>
                      <div className="font-mono text-2xl text-indigo-300 mb-2">{task.expr}</div>
                      <p className="text-sm text-slate-400">{task.desc}</p>
                    </div>
                  ))}
                  <button className="w-full py-3 text-sm text-indigo-400 hover:text-indigo-300 border border-dashed border-slate-700 hover:border-indigo-500/50 rounded-xl transition-all">
                    + Сгенерировать ещё задания
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
