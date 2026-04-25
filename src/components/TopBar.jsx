import { Sun, Moon, Upload, Download, RotateCcw } from 'lucide-react'

export default function TopBar({ dark, onToggleDark, onImportExport, onReset }) {
  return (
    <header className="sticky top-0 z-40 glass bg-white/90 dark:bg-gray-950/90 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">⚡</span>
          <span className="font-display font-extrabold text-lg text-gradient">PR Course Tracker</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onImportExport}
            className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-brand-500 transition-all"
            title="Import / Export"
          >
            <Download size={18} />
          </button>
          <button
            onClick={onReset}
            className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-all"
            title="Reset progress"
          >
            <RotateCcw size={18} />
          </button>
          <button
            onClick={onToggleDark}
            className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
          >
            {dark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  )
}
