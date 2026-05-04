import { useState } from 'react'
import Navbar from '../components/Navbar'
import { User, Lock, Bell, Trash2, Camera, Save } from 'lucide-react'

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: 'Алексей Иванов',
    email: 'ivanov@student.bmstu.ru',
    university: 'МГТУ им. Н.Э. Баумана',
    group: 'МТ-301',
  })
  const [notifications, setNotifications] = useState({
    email: true,
    browser: false,
    weekly: true,
    achievements: true,
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Профиль</h1>
          <p className="text-slate-400">Управление личными данными и настройками</p>
        </div>

        <div className="space-y-6">
          {/* Avatar + basic info */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-400" />
              Личная информация
            </h2>
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-4xl font-bold text-white">
                  А
                </div>
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-full flex items-center justify-center transition-all">
                  <Camera className="w-4 h-4 text-slate-300" />
                </button>
              </div>

              <div className="flex-1 grid sm:grid-cols-2 gap-4">
                {[
                  { label: 'Полное имя', key: 'name' as const, placeholder: 'Иванов Иван Иванович' },
                  { label: 'Email', key: 'email' as const, placeholder: 'your@email.com' },
                  { label: 'Университет', key: 'university' as const, placeholder: 'Название университета' },
                  { label: 'Группа', key: 'group' as const, placeholder: 'МТ-301' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">{f.label}</label>
                    <input
                      type="text"
                      value={profile[f.key]}
                      onChange={e => setProfile({ ...profile, [f.key]: e.target.value })}
                      placeholder={f.placeholder}
                      className="w-full bg-slate-900/80 border border-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 outline-none transition-all text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                onClick={handleSave}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${saved ? 'bg-green-500/20 border border-green-500/30 text-green-400' : 'bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white'}`}
              >
                <Save className="w-4 h-4" />
                {saved ? 'Сохранено!' : 'Сохранить изменения'}
              </button>
            </div>
          </div>

          {/* Change password */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <Lock className="w-5 h-5 text-indigo-400" />
              Смена пароля
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {['Текущий пароль', 'Новый пароль', 'Подтвердите пароль'].map(label => (
                <div key={label}>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">{label}</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-slate-900/80 border border-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 outline-none transition-all text-sm"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-xl text-white text-sm font-medium transition-all">
                Изменить пароль
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <Bell className="w-5 h-5 text-indigo-400" />
              Уведомления
            </h2>
            <div className="space-y-4">
              {[
                { key: 'email' as const, label: 'Email-уведомления', desc: 'Получать уведомления на почту' },
                { key: 'browser' as const, label: 'Уведомления браузера', desc: 'Push-уведомления в браузере' },
                { key: 'weekly' as const, label: 'Еженедельный отчёт', desc: 'Сводка прогресса за неделю' },
                { key: 'achievements' as const, label: 'Достижения', desc: 'Уведомления о новых достижениях' },
              ].map(n => (
                <div key={n.key} className="flex items-center justify-between py-1">
                  <div>
                    <div className="text-sm font-medium text-white">{n.label}</div>
                    <div className="text-xs text-slate-500">{n.desc}</div>
                  </div>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, [n.key]: !prev[n.key] }))}
                    className={`relative w-12 h-6 rounded-full transition-all ${notifications[n.key] ? 'bg-indigo-500' : 'bg-slate-700'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${notifications[n.key] ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Danger zone */}
          <div className="bg-red-500/5 backdrop-blur border border-red-500/20 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-red-400 mb-2 flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Опасная зона
            </h2>
            <p className="text-slate-400 text-sm mb-4">Удаление аккаунта необратимо. Все данные будут уничтожены.</p>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 text-red-400 rounded-xl text-sm font-medium transition-all">
              <Trash2 className="w-4 h-4" />
              Удалить аккаунт
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
