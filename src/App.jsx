import { useState, useEffect } from 'react'
import TopBar from './components/TopBar'
import BottomNav from './components/BottomNav'
import Modal from './components/Modal'
import { Toast, showToast } from './components/Toast'
import HomePage from './pages/HomePage'
import ModulesPage from './pages/ModulesPage'
import SearchPage from './pages/SearchPage'
import PlannerPage from './pages/PlannerPage'
import { useProgress } from './hooks/useProgress'

export default function App() {
  const [tab, setTab] = useState('home')
  const [showReset, setShowReset] = useState(false)
  const [showIE, setShowIE] = useState(false)
  const [ieText, setIeText] = useState('')

  const { completed, dark, toggleUnit, resetAll, toggleDark, exportData, importData } = useProgress()

  // Apply dark mode class to html
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  function handleOpenIE() {
    setIeText(exportData())
    setShowIE(true)
  }
  function handleImport() {
    const ok = importData(ieText)
    if (ok) { showToast('✅ Progress imported!'); setShowIE(false) }
    else showToast('❌ Invalid data — check format', 'error')
  }
  function handleCopy() {
    navigator.clipboard?.writeText(ieText).catch(() => {})
    showToast('📋 Copied to clipboard!')
  }
  function handleReset() {
    resetAll(); setShowReset(false); showToast('Progress reset!', 'info')
  }

  const pages = {
    home:    <HomePage completed={completed} />,
    modules: <ModulesPage completed={completed} onToggle={toggleUnit} />,
    search:  <SearchPage completed={completed} onToggle={toggleUnit} />,
    planner: <PlannerPage completed={completed} />,
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <TopBar
        dark={dark}
        onToggleDark={toggleDark}
        onImportExport={handleOpenIE}
        onReset={() => setShowReset(true)}
      />

      <main className="pb-24">
        {pages[tab]}
      </main>

      <BottomNav active={tab} onChange={setTab} />

      {/* Reset confirm modal */}
      <Modal open={showReset} onClose={() => setShowReset(false)} title="⚠ Reset Progress?">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">
          This will clear all your completed videos. This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setShowReset(false)}
            className="px-4 py-2 rounded-xl text-sm font-display font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl text-sm font-display font-semibold text-white bg-rose-500 hover:bg-rose-600 transition-colors"
          >
            Reset All
          </button>
        </div>
      </Modal>

      {/* Import / Export modal */}
      <Modal open={showIE} onClose={() => setShowIE(false)} title="⬆⬇ Import / Export Progress">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">
          Copy this code to back up your progress, or paste a saved code to restore it.
        </p>
        <textarea
          value={ieText}
          onChange={e => setIeText(e.target.value)}
          className="w-full h-32 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-xs font-mono-jet text-gray-700 dark:text-gray-300 outline-none resize-none focus:border-brand-400 transition-colors"
        />
        <div className="flex gap-3 justify-end mt-4">
          <button
            onClick={() => setShowIE(false)}
            className="px-4 py-2 rounded-xl text-sm font-display font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl text-sm font-display font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            📋 Copy
          </button>
          <button
            onClick={handleImport}
            className="px-4 py-2 rounded-xl text-sm font-display font-semibold text-white bg-brand-500 hover:bg-brand-600 transition-colors"
          >
            ⬆ Import
          </button>
        </div>
      </Modal>

      <Toast />
    </div>
  )
}
