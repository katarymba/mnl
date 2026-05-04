import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sigma, GraduationCap, BookOpen, ArrowRight, ArrowLeft } from 'lucide-react'

export default function Register() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [role, setRole] = useState<'student' | 'teacher' | null>(null)
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute top-20 right-10 text-8xl text-slate-800/60 font-serif">∂</span>
        <span className="absolute bottom-20 left-10 text-9xl text-slate-800/60 font-serif">∇</span>
        <span className="absolute top-1/2 left-1/4 text-7xl text-slate-800/40 font-serif">∞</span>
      </div>

      <div className="w-full max-w-lg relative z-10">
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 mb-4">
              <Sigma className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Регистрация</h1>
            <p className="text-slate-400 text-sm mt-1">Шаг {step} из 2</p>
          </div>

          {/* Progress */}
          <div className="flex gap-2 mb-8">
            {[1, 2].map((s) => (
              <div key={s} className={`h-1 flex-1 rounded-full transition-all ${s <= step ? 'bg-gradient-to-r from-indigo-500 to-violet-500' : 'bg-slate-700'}`} />
            ))}
          </div>

          {step === 1 && (
            <div>
              <h2 className="text-lg font-semibold text-white mb-4 text-center">Выберите вашу роль</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'student' as const, icon: <GraduationCap className="w-10 h-10" />, label: 'Студент', desc: 'Решайте задания и отслеживайте прогресс' },
                  { id: 'teacher' as const, icon: <BookOpen className="w-10 h-10" />, label: 'Преподаватель', desc: 'Управляйте заданиями и студентами' },
                ].map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRole(r.id)}
                    className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all ${
                      role === r.id
                        ? 'border-indigo-500 bg-indigo-500/10 text-white'
                        : 'border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white'
                    }`}
                  >
                    <div className={`${role === r.id ? 'text-indigo-400' : 'text-slate-400'} transition-colors`}>
                      {r.icon}
                    </div>
                    <span className="font-semibold">{r.label}</span>
                    <span className="text-xs text-slate-400 text-center leading-relaxed">{r.desc}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => role && setStep(2)}
                disabled={!role}
                className="w-full mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all"
              >
                Далее <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Полное имя</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Иванов Иван Иванович"
                  className="w-full bg-slate-900/80 border border-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="student@university.ru"
                  className="w-full bg-slate-900/80 border border-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Пароль</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Минимум 8 символов"
                  className="w-full bg-slate-900/80 border border-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-all text-sm"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-white text-sm font-medium transition-all"
                >
                  <ArrowLeft className="w-4 h-4" /> Назад
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/25"
                >
                  Зарегистрироваться
                </button>
              </div>
            </form>
          )}

          <p className="text-center text-slate-400 text-sm mt-6">
            Уже есть аккаунт?{' '}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
