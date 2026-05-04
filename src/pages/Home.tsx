import { Link } from 'react-router-dom'
import { Sigma, Zap, Brain, BarChart2, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Decorative math symbols */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <span className="absolute top-20 left-10 text-9xl text-slate-800/50 font-serif select-none">∫</span>
        <span className="absolute top-40 right-20 text-8xl text-slate-800/50 font-serif select-none">∑</span>
        <span className="absolute bottom-40 left-20 text-7xl text-slate-800/50 font-serif select-none">∂</span>
        <span className="absolute bottom-20 right-10 text-9xl text-slate-800/50 font-serif select-none">∇</span>
        <span className="absolute top-1/2 left-1/3 text-6xl text-slate-800/30 font-serif select-none">π</span>
        <span className="absolute top-1/3 right-1/3 text-7xl text-slate-800/30 font-serif select-none">∞</span>
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Sigma className="w-7 h-7 text-indigo-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            MathGen AI
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-slate-300 hover:text-white transition-colors text-sm font-medium px-4 py-2">
            Войти
          </Link>
          <Link to="/register" className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all">
            Зарегистрироваться
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-5xl mx-auto px-8 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-4 py-1.5 text-indigo-300 text-sm mb-8">
          <Zap className="w-4 h-4" />
          Powered by Generative AI
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
            Генеративный AI
          </span>
          <br />
          <span className="text-white">для задач математического</span>
          <br />
          <span className="text-white">анализа</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Система автоматической генерации персонализированных заданий по математическому анализу.
          Адаптивное обучение, детальная аналитика и мгновенная проверка решений.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            to="/login"
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
          >
            Войти в систему <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/register"
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-all"
          >
            Зарегистрироваться
          </Link>
        </div>

        {/* Math preview */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto opacity-60">
          {['∫₀¹ x² dx = ⅓', 'lim(x→0) sin(x)/x = 1', "f'(x) = 2x + 1"].map((expr) => (
            <div key={expr} className="bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-xs text-indigo-300 font-mono">
              {expr}
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-6xl mx-auto px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-white mb-4">Возможности системы</h2>
        <p className="text-slate-400 text-center mb-12">Всё необходимое для эффективного обучения математическому анализу</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Sigma className="w-8 h-8" />,
              title: 'Автогенерация заданий',
              desc: 'ИИ генерирует уникальные задачи по пределам, производным, интегралам и дифференциальным уравнениям с настраиваемой сложностью.',
              color: 'from-indigo-500 to-blue-500',
            },
            {
              icon: <Brain className="w-8 h-8" />,
              title: 'Адаптивные тесты',
              desc: 'Система анализирует ваши результаты и автоматически подбирает задания оптимальной сложности для максимального прогресса.',
              color: 'from-violet-500 to-purple-500',
            },
            {
              icon: <BarChart2 className="w-8 h-8" />,
              title: 'Детальная статистика',
              desc: 'Отслеживайте прогресс по каждому разделу, анализируйте ошибки и получайте персонализированные рекомендации.',
              color: 'from-purple-500 to-pink-500',
            },
          ].map((f) => (
            <div key={f.title} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 hover:border-slate-600 transition-all group">
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${f.color} mb-4 group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 max-w-4xl mx-auto px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-white mb-4">Как это работает</h2>
        <p className="text-slate-400 text-center mb-12">Три простых шага до эффективного обучения</p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Выберите тему', desc: 'Укажите раздел математического анализа и желаемый уровень сложности заданий.' },
            { step: '02', title: 'ИИ генерирует задания', desc: 'Нейронная сеть создаёт уникальные задачи с подробными условиями и пошаговыми решениями.' },
            { step: '03', title: 'Решайте и анализируйте', desc: 'Решайте задачи, получайте мгновенную проверку и просматривайте детальную статистику прогресса.' },
          ].map((item) => (
            <div key={item.step} className="relative text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 mb-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">{item.step}</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800 py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sigma className="w-5 h-5 text-indigo-400" />
          <span className="font-semibold text-white">MathGen AI</span>
        </div>
        <p className="text-slate-500 text-sm">Курсовой проект по дисциплине «Программные средства цифровой экономики»</p>
        <p className="text-slate-600 text-xs mt-1">Система генерации заданий по математическому анализу на основе генеративного ИИ</p>
      </footer>
    </div>
  )
}
