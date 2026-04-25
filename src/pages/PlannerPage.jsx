import { useState, useMemo } from 'react'
import { CalendarDays, Clock, Zap, BookOpen } from 'lucide-react'
import { allModules, getStats, getModuleStats, totalDurMin } from '../utils/stats'

const HOUR_OPTIONS = [0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8]

function fmtMin(min) {
  const h = Math.floor(min / 60)
  const m = min % 60
  if (h === 0) return `${m}m`
  if (m === 0) return `${h}h`
  return `${h}h ${m}m`
}

export default function PlannerPage({ completed }) {
  const [hoursToday, setHoursToday] = useState(2)
  const [hrsPerDay, setHrsPerDay] = useState(2)

  const s = getStats(completed)

  const { completable, partial } = useMemo(() => {
    const budget = hoursToday * 60
    let remaining = budget
    const completable = []
    const partial = []

    for (const { ms, mod } of allModules) {
      const stats = getModuleStats(mod, completed)
      const videos = mod.units.filter(u => u.type === 'video')
      const unwatched = videos.filter(u => !completed[u.id])
      const remDur = unwatched.reduce((s, u) => s + (u.duration || 0), 0)
      if (remDur === 0) continue

      if (remDur <= remaining) {
        completable.push({ ms, mod, stats, remDur, count: unwatched.length })
        remaining -= remDur
      } else if (partial.length === 0) {
        // First module that doesn't fully fit
        const canWatch = []
        let b = remaining
        for (const u of unwatched) {
          if ((u.duration || 0) <= b) { canWatch.push(u); b -= (u.duration || 0) }
        }
        partial.push({ ms, mod, stats, remDur, count: unwatched.length, canWatch, canMin: remaining - b })
        break
      }
    }

    return { completable, partial }
  }, [hoursToday, completed])

  const daysNeeded = s.remainMin > 0 ? Math.ceil(s.remainMin / (hrsPerDay * 60)) : 0

  const suggestedModules = [...completable, ...partial]

  return (
    <div className="px-4 py-5 max-w-3xl mx-auto space-y-5">
      {/* Header */}
      <div className="animate-slide-up" style={{ animationFillMode: 'both' }}>
        <p className="text-[10px] font-display font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">STUDY PLANNER</p>
        <h2 className="font-display font-extrabold text-2xl text-gray-900 dark:text-white">Daily Plan</h2>
      </div>

      {/* Today's hours selector */}
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm animate-slide-up"
        style={{ animationDelay: '40ms', animationFillMode: 'both' }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-brand-500/10 flex items-center justify-center">
            <Clock size={15} className="text-brand-500" />
          </div>
          <p className="font-display font-bold text-sm text-gray-900 dark:text-white">Hours Available Today</p>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {HOUR_OPTIONS.map(h => (
            <button
              key={h}
              onClick={() => setHoursToday(h)}
              className={`py-2.5 rounded-xl text-sm font-display font-bold transition-all
                ${hoursToday === h
                  ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              {h < 1 ? '30m' : `${h}h`}
            </button>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            With <span className="font-bold text-brand-500">{hoursToday}h</span> today you can complete{' '}
            <span className="font-bold text-emerald-500">{completable.length} full module{completable.length !== 1 ? 's' : ''}</span>
            {partial.length > 0 && ` + part of ${partial[0].mod.name.split(':')[0]}`}.
          </p>
        </div>
      </div>

      {/* Days-to-complete calculator */}
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm animate-slide-up"
        style={{ animationDelay: '60ms', animationFillMode: 'both' }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <CalendarDays size={15} className="text-amber-500" />
          </div>
          <p className="font-display font-bold text-sm text-gray-900 dark:text-white">Completion Estimate</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-[10px] font-display font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 block mb-2">
              Hours per day
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setHrsPerDay(h => Math.max(0.5, h - 0.5))}
                className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-bold text-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
              >−</button>
              <span className="font-display font-extrabold text-2xl text-gray-900 dark:text-white w-12 text-center">{hrsPerDay}h</span>
              <button
                onClick={() => setHrsPerDay(h => Math.min(16, h + 0.5))}
                className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-bold text-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
              >+</button>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[10px] font-display font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Days needed</p>
            {s.remainMin === 0 ? (
              <p className="font-display font-extrabold text-3xl text-emerald-500">Done! 🎉</p>
            ) : (
              <>
                <p className="font-display font-extrabold text-3xl text-brand-500">{daysNeeded}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{fmtMin(s.remainMin)} left</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Suggested modules for today */}
      <div
        className="animate-slide-up"
        style={{ animationDelay: '80ms', animationFillMode: 'both' }}
      >
        <p className="text-[10px] font-display font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
          SUGGESTED FOR TODAY · {hoursToday}h session
        </p>

        {suggestedModules.length === 0 ? (
          <div className="text-center py-10 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
            <p className="font-display font-bold text-emerald-500 text-lg">🎉 All done!</p>
            <p className="text-xs text-gray-400 mt-1">No remaining videos. Course complete!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {suggestedModules.map(({ ms, mod, stats, remDur, count, canWatch, canMin }, i) => {
              const isPartial = !!canWatch
              return (
                <div
                  key={mod.id}
                  className={`bg-white dark:bg-gray-900 rounded-2xl p-4 border shadow-sm
                    ${isPartial
                      ? 'border-dashed border-gray-200 dark:border-gray-700'
                      : 'border-gray-100 dark:border-gray-800'}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0
                      ${isPartial ? 'bg-amber-500/10' : 'bg-brand-500/10'}`}>
                      <BookOpen size={14} className={isPartial ? 'text-amber-500' : 'text-brand-500'} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-sm text-gray-900 dark:text-white leading-snug">{mod.name}</p>
                      <p className="text-[10px] font-mono-jet text-gray-400 dark:text-gray-600 mt-0.5">{ms.title}</p>
                      {isPartial && (
                        <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1">
                          Partial — watch {canWatch.length} of {count} videos ({fmtMin(canMin)})
                        </p>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-display font-bold text-sm text-gray-700 dark:text-gray-300">{fmtMin(isPartial ? canMin : remDur)}</p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-600">{isPartial ? canWatch.length : count} videos</p>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-3 w-full h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-500 to-violet-500 transition-all"
                      style={{ width: `${stats.pct}%` }}
                    />
                  </div>
                  <p className="text-[10px] font-mono-jet text-gray-400 dark:text-gray-600 mt-1">{stats.pct}% complete · {stats.vDone}/{stats.vTotal} videos done</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
