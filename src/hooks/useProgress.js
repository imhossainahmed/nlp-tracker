import { useState, useCallback } from 'react'

const STORAGE_KEY = 'nlp_tracker_v2'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (_) {}
  return { completed: {}, dark: false }
}

function save(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (_) {}
}

export function useProgress() {
  const [state, setState] = useState(() => load())

  const toggleUnit = useCallback((unitId) => {
    setState(prev => {
      const completed = { ...prev.completed }
      if (completed[unitId]) delete completed[unitId]
      else completed[unitId] = true
      const next = { ...prev, completed }
      save(next)
      return next
    })
  }, [])

  const resetAll = useCallback(() => {
    setState(prev => {
      const next = { ...prev, completed: {} }
      save(next)
      return next
    })
  }, [])

  const toggleDark = useCallback(() => {
    setState(prev => {
      const next = { ...prev, dark: !prev.dark }
      save(next)
      return next
    })
  }, [])

  const exportData = useCallback(() => {
    return JSON.stringify(state, null, 2)
  }, [state])

  const importData = useCallback((raw) => {
    try {
      const parsed = JSON.parse(raw)
      if (typeof parsed.completed !== 'object') throw new Error()
      setState(parsed)
      save(parsed)
      return true
    } catch (_) {
      return false
    }
  }, [])

  return {
    completed: state.completed,
    dark: state.dark,
    toggleUnit,
    resetAll,
    toggleDark,
    exportData,
    importData,
  }
}
