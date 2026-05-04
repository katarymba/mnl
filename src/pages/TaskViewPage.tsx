import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { ChevronLeft, ChevronRight, Clock, Star, CheckCircle, XCircle, BookOpen } from 'lucide-react'

const TASK = {
  id: 1,
  topic: 'Интегралы',
  subtopic: 'Определённый интеграл',
  difficulty: 3,
  expr: '∫₀² (3x² - 2x + 1) dx',
  desc: 'Вычислите определённый интеграл функции f(x) = 3x² − 2x + 1 на отрезке [0, 2]',
  answer: '6',
  solution: [
    { step: 1, text: 'Находим первообразную F(x) = ∫(3x² − 2x + 1)dx = x³ − x² + x + C' },
    { step: 2, text: 'Вычисляем F(2) = 8 − 4 + 2 = 6' },
    { step: 3, text: 'Вычисляем F(0) = 0 − 0 + 0 = 0' },
    { step: 4, text: 'Применяем формулу Ньютона-Лейбница: F(2) − F(0) = 6 − 0 = 6' },
  ],
}

export default function TaskViewPage() {
  const { id } = useParams()
  const [answer, setAnswer] = useState('')
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [time] = useState(0)

  // Simple timer display
  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`

  const checkAnswer = () => {
    const isCorrect = answer.trim() === TASK.answer
    setCorrect(isCorrect)
    setChecked(true)
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link to="/library" className="hover:text-slate-300 transition-colors">Библиотека</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-indigo-400">{TASK.topic}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-400">{TASK.subtopic}</span>
        </div>

        {/* Task card */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full px-3 py-1 text-sm font-medium">
                {TASK.topic}
              </span>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className={`w-4 h-4 ${s <= TASK.difficulty ? 'text-yellow-400 fill-yellow-400' : 'text-slate-700'}`} />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-400 bg-slate-900/50 rounded-lg px-3 py-1.5 text-sm">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{formatTime(time)}</span>
            </div>
          </div>

          <div className="text-center py-8 border-y border-slate-700 mb-6">
            <div className="text-5xl font-mono text-indigo-300 mb-4">{TASK.expr}</div>
            <p className="text-slate-300 text-lg">{TASK.desc}</p>
          </div>

          {/* Answer */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-300">Ваш ответ</label>
            <div className="flex gap-3">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Введите ответ или решение..."
                rows={3}
                className="flex-1 bg-slate-900/80 border border-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-all text-sm resize-none"
              />
            </div>
            <button
              onClick={checkAnswer}
              className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/25"
            >
              Проверить ответ
            </button>
          </div>

          {/* Result */}
          {checked && (
            <div className={`mt-6 p-4 rounded-xl border flex items-center gap-3 ${correct ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
              {correct ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <XCircle className="w-5 h-5 flex-shrink-0" />}
              <span className="font-medium">{correct ? 'Правильно! Отличная работа!' : `Неверно. Правильный ответ: ${TASK.answer}`}</span>
            </div>
          )}
        </div>

        {/* Solution */}
        {checked && (
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 mb-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              Пошаговое решение
            </h2>
            <div className="space-y-4">
              {TASK.solution.map((s) => (
                <div key={s.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white">
                    {s.step}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed pt-1">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link
            to={`/tasks/${Number(id) - 1}`}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-white text-sm font-medium transition-all"
          >
            <ChevronLeft className="w-4 h-4" /> Предыдущее
          </Link>
          <Link
            to={`/tasks/${Number(id) + 1}`}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 rounded-xl text-white text-sm font-medium transition-all"
          >
            Следующее <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
