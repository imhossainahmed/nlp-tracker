import { useEffect, useState } from 'react'

let _show = null

export function showToast(msg, type = 'success') {
  _show && _show(msg, type)
}

export function Toast() {
  const [item, setItem] = useState(null)

  useEffect(() => {
    _show = (msg, type) => {
      setItem({ msg, type, id: Date.now() })
    }
    return () => { _show = null }
  }, [])

  useEffect(() => {
    if (!item) return
    const t = setTimeout(() => setItem(null), 2800)
    return () => clearTimeout(t)
  }, [item])

  if (!item) return null

  const colors = {
    success: 'border-l-emerald-500 text-emerald-700 dark:text-emerald-400',
    error:   'border-l-red-500 text-red-700 dark:text-red-400',
    info:    'border-l-brand-500 text-brand-600 dark:text-brand-400',
  }

  return (
    <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-[300] animate-slide-up
      bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700
      px-4 py-3 text-sm font-medium border-l-4 min-w-[220px] max-w-xs text-center
      ${colors[item.type] || colors.success}`}>
      {item.msg}
    </div>
  )
}
