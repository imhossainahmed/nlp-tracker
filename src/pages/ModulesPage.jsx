import { useState } from 'react'
import { ChevronDown, CheckCircle2, Circle, FileText, Video, ClipboardList } from 'lucide-react'
import { COURSE_DATA } from '../data/courseData'
import { getModuleStats } from '../utils/stats'

const MS_COLORS = [
  'bg-violet-600', 'bg-brand-500', 'bg-sky-500', 'bg-emerald-500',
  'bg-amber-500',  'bg-rose-500',  'bg-fuchsia-500', 'bg-teal-500', 'bg-orange-500',
]
const MS_TEXT = [
  'text-violet-600', 'text-brand-500', 'text-sky-500', 'text-emerald-500',
  'text-amber-500',  'text-rose-500',  'text-fuchsia-500', 'text-teal-500', 'text-orange-500',
]
const MS_BG = [
  'bg-violet-50 dark:bg-violet-900/10',
  'bg-brand-50 dark:bg-brand-500/10',
  'bg-sky-50 dark:bg-sky-900/10',
  'bg-emerald-50 dark:bg-emerald-900/10',
  'bg-amber-50 dark:bg-amber-900/10',
  'bg-rose-50 dark:bg-rose-900/10',
  'bg-fuchsia-50 dark:bg-fuchsia-900/10',
  'bg-teal-50 dark:bg-teal-900/10',
  'bg-orange-50 dark:bg-orange-900/10',
]
const MS_BORDER = [
  'border-violet-200 dark:border-violet-800',
  'border-brand-200 dark:border-brand-800',
  'border-sky-200 dark:border-sky-800',
  'border-emerald-200 dark:border-emerald-800',
  'border-amber-200 dark:border-amber-800',
  'border-rose-200 dark:border-rose-800',
  'border-fuchsia-200 dark:border-fuchsia-800',
  'border-teal-200 dark:border-teal-800',
  'border-orange-200 dark:border-orange-800',
]

function unitIcon(type) {
  if (type === 'video') return <Video size={13} className="text-brand-400" />
  if (type === 'assignment' || type === 'quiz') return <ClipboardList size={13} className="text-amber-500" />
  return <FileText size={13} className="text-gray-400" />
}
function unitBadge(type) {
  const map = {
    video:      'bg-brand-500/10 text-brand-600 dark:text-brand-400',
    post:       'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    assignment: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
    quiz:       'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  }
  return map[type] || 'bg-gray-100 text-gray-500'
}

function ModuleCard({ mod, msIdx, modIdx, completed, onToggle }) {
  const [open, setOpen] = useState(false)
  const stats = getModuleStats(mod, completed)
  const color = MS_TEXT[msIdx % MS_COLORS.length]
  const barColor = [
    'from-violet-500 to-purple-600', 'from-brand-500 to-violet-500',
    'from-sky-400 to-blue-500', 'from-emerald-400 to-teal-500',
    'from-amber-400 to-orange-500', 'from-rose-400 to-pink-500',
    'from-fuchsia-400 to-pink-500', 'from-teal-400 to-cyan-500',
    'from-orange-400 to-amber-500',
  ][msIdx % 9]

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left"
      >
        {/* Module number badge */}
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-sm flex-shrink-0
          border-2 ${stats.allDone
            ? 'bg-emerald-500 border-emerald-500 text-white'
            : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400'}`}>
          {stats.allDone ? <CheckCircle2 size={16} /> : modIdx + 1}
        </div>

        <div className="flex-1 min-w-0">
          {/* Title */}
          <p className="font-display font-bold text-sm text-gray-900 dark:text-white leading-snug truncate pr-2">
            {mod.name.toUpperCase()}
            {stats.allDone && <span className="ml-2 text-emerald-500">✔</span>}
          </p>
          {/* Progress bar */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${barColor} transition-all duration-500`}
                style={{ width: `${stats.pct}%` }}
              />
            </div>
            <span className="text-[10px] font-mono-jet text-gray-400 dark:text-gray-500 flex-shrink-0">{stats.pct}%</span>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {stats.allDone ? (
            <span className="text-xs font-display font-bold text-white bg-emerald-500 px-2.5 py-1 rounded-lg">
              PASSED
            </span>
          ) : (
            <span className="text-xs font-mono-jet text-gray-400 dark:text-gray-500">
              {stats.vDone}/{stats.vTotal}
            </span>
          )}
          <ChevronDown
            size={16}
            className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Unit list */}
      {open && (
        <div className="border-t border-gray-100 dark:border-gray-800">
          {/* Mini progress bar */}
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/40">
            <div className="flex items-center justify-between text-[10px] font-mono-jet text-gray-400 mb-1">
              <span>{stats.vDone} of {stats.vTotal} videos · {Math.floor(stats.dur/60)}h{stats.dur%60}m</span>
            </div>
            <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${barColor} transition-all`}
                style={{ width: `${stats.pct}%` }}
              />
            </div>
          </div>

          {mod.units.map(unit => {
            const done = !!completed[unit.id]
            const isVideo = unit.type === 'video'
            return (
              <button
                key={unit.id}
                onClick={() => isVideo && onToggle(unit.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 border-b last:border-b-0 border-gray-50 dark:border-gray-800/80
                  text-left transition-colors
                  ${isVideo ? 'hover:bg-gray-50 dark:hover:bg-gray-800/40 cursor-pointer' : 'cursor-default'}
                  ${done ? 'opacity-60' : ''}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all
                  ${done
                    ? 'bg-emerald-500 text-white'
                    : isVideo
                      ? 'border-2 border-brand-300 dark:border-brand-700 text-transparent'
                      : 'border-2 border-gray-200 dark:border-gray-700'}`}>
                  {done ? <CheckCircle2 size={13} /> : isVideo ? <Circle size={10} className="text-brand-300" /> : null}
                </div>

                <span className={`flex-1 text-xs leading-snug ${done ? 'line-through text-gray-400 dark:text-gray-600' : 'text-gray-700 dark:text-gray-300'}`}>
                  {unit.name}
                </span>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {unit.type === 'video' && unit.duration && (
                    <span className="text-[10px] font-mono-jet text-gray-400 dark:text-gray-600">{unit.duration}m</span>
                  )}
                  <span className={`text-[10px] font-mono-jet px-1.5 py-0.5 rounded-md ${unitBadge(unit.type)}`}>
                    {unit.type}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function ModulesPage({ completed, onToggle }) {
  return (
    <div className="px-4 py-5 max-w-3xl mx-auto">
      <div className="mb-5 animate-slide-up" style={{ animationFillMode: 'both' }}>
        <p className="text-[10px] font-display font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">COURSE LOG & ROADMAP</p>
        <h2 className="font-display font-extrabold text-2xl text-gray-900 dark:text-white">All Modules</h2>
      </div>

      <div className="space-y-5">
        {COURSE_DATA.map((ms, msIdx) => (
          <div key={ms.id} className="animate-slide-up" style={{ animationDelay: `${msIdx * 30}ms`, animationFillMode: 'both' }}>
            {/* Milestone header */}
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-8 h-7 rounded-lg ${MS_COLORS[msIdx % MS_COLORS.length]} flex items-center justify-center`}>
                <span className="font-display font-bold text-[10px] text-white">M{msIdx}</span>
              </div>
              <p className={`font-display font-extrabold text-xs uppercase tracking-widest ${MS_TEXT[msIdx % MS_TEXT.length]}`}>
                {ms.title}
              </p>
            </div>

            <div className="space-y-2 pl-0">
              {ms.modules.map((mod, modIdx) => (
                <ModuleCard
                  key={mod.id}
                  mod={mod}
                  msIdx={msIdx}
                  modIdx={modIdx}
                  completed={completed}
                  onToggle={onToggle}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
