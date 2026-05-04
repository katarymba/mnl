import { useState } from 'react'
import Navbar from '../components/Navbar'
import { Download, FileText, History } from 'lucide-react'

const TOPICS = ['Пределы', 'Производные', 'Интегралы', 'Ряды', 'Диф. уравнения']

const HISTORY = [
  { date: '03.05.2025', topics: 'Интегралы, Пределы', count: 10, format: 'PDF', size: '1.2 МБ' },
  { date: '28.04.2025', topics: 'Производные', count: 5, format: 'DOCX', size: '0.8 МБ' },
  { date: '20.04.2025', topics: 'Все разделы', count: 20, format: 'LaTeX', size: '0.4 МБ' },
]

export default function ExportPage() {
  const [selected, setSelected] = useState<string[]>(['Интегралы', 'Пределы'])
  const [diffMin, setDiffMin] = useState(1)
  const [diffMax, setDiffMax] = useState(5)
  const [count, setCount] = useState(10)
  const [format, setFormat] = useState('PDF')
  const [downloading, setDownloading] = useState(false)

  const toggleTopic = (t: string) => {
    setSelected(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  }

  const handleDownload = () => {
    setDownloading(true)
    setTimeout(() => setDownloading(false), 1500)
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Download className="w-8 h-8 text-indigo-400" />
            Экспорт заданий
          </h1>
          <p className="text-slate-400">Сформируйте и скачайте набор заданий в удобном формате</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Form */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-5">Настройки экспорта</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">Темы</label>
                  <div className="grid grid-cols-2 gap-2">
                    {TOPICS.map(t => (
                      <label key={t} className="flex items-center gap-2.5 cursor-pointer group">
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${selected.includes(t) ? 'bg-indigo-500 border-indigo-500' : 'border-slate-600 group-hover:border-slate-500'}`}
                          onClick={() => toggleTopic(t)}
                        >
                          {selected.includes(t) && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-sm transition-colors ${selected.includes(t) ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'}`}>{t}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Диапазон сложности: {diffMin} – {diffMax}
                  </label>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 w-4">1</span>
                    <input type="range" min={1} max={5} value={diffMin} onChange={e => setDiffMin(Math.min(Number(e.target.value), diffMax))} className="flex-1 accent-indigo-500" />
                    <span className="text-xs text-slate-500">–</span>
                    <input type="range" min={1} max={5} value={diffMax} onChange={e => setDiffMax(Math.max(Number(e.target.value), diffMin))} className="flex-1 accent-violet-500" />
                    <span className="text-xs text-slate-500 w-4">5</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Количество заданий: <span className="text-indigo-400">{count}</span>
                  </label>
                  <input type="range" min={1} max={50} value={count} onChange={e => setCount(Number(e.target.value))} className="w-full accent-indigo-500" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">Формат файла</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['PDF', 'DOCX', 'LaTeX'].map(f => (
                      <button
                        key={f}
                        onClick={() => setFormat(f)}
                        className={`py-2.5 rounded-xl border text-sm font-medium transition-all ${format === f ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300' : 'border-slate-700 text-slate-400 hover:border-slate-600 hover:text-white'}`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleDownload}
                  disabled={downloading || selected.length === 0}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-500/25"
                >
                  {downloading ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Формирование...</>
                  ) : (
                    <><Download className="w-5 h-5" /> Скачать набор ({count} заданий)</>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                Предпросмотр
              </h2>
              <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4 text-sm">
                <div className="text-slate-300 font-semibold mb-3">Набор заданий по математическому анализу</div>
                <div className="text-slate-500 text-xs mb-3">Разделы: {selected.join(', ') || 'не выбраны'}</div>
                <div className="space-y-2">
                  {selected.slice(0, 3).map((t, i) => (
                    <div key={t} className="flex gap-2">
                      <span className="text-indigo-400 font-mono text-xs">{i + 1}.</span>
                      <span className="text-slate-400 text-xs">Задание по теме «{t}»...</span>
                    </div>
                  ))}
                  {count > 3 && <div className="text-slate-600 text-xs pl-5">...и ещё {count - 3} заданий</div>}
                </div>
                <div className="mt-3 pt-3 border-t border-slate-700 text-xs text-slate-500 flex justify-between">
                  <span>Формат: {format}</span>
                  <span>≈ {(count * 0.12).toFixed(1)} МБ</span>
                </div>
              </div>
            </div>

            {/* Export history */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <History className="w-5 h-5 text-indigo-400" />
                История экспорта
              </h2>
              <div className="space-y-3">
                {HISTORY.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-slate-900/40 rounded-xl">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-slate-300 truncate">{h.topics}</div>
                      <div className="text-xs text-slate-500">{h.count} зад. · {h.format} · {h.size}</div>
                      <div className="text-xs text-slate-600">{h.date}</div>
                    </div>
                    <button className="text-indigo-400 hover:text-indigo-300 transition-colors flex-shrink-0">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
