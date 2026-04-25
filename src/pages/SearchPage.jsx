import { useState, useMemo } from 'react'
import { Search, CheckCircle2, Circle, Video, FileText, ClipboardList } from 'lucide-react'
import { allUnits } from '../utils/stats'

function unitBadge(type) {
  const map = {
    video:      'bg-brand-500/10 text-brand-600 dark:text-brand-400',
    post:       'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    assignment: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
    quiz:       'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  }
  return map[type] || 'bg-gray-100 text-gray-500'
}

export default function SearchPage({ completed, onToggle }) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return allUnits
      .filter(u => u.unit.name.toLowerCase().includes(q) || u.mod.name.toLowerCase().includes(q))
      .slice(0, 80)
  }, [query])

  return (
    <div className="px-4 py-5 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-5 animate-slide-up" style={{ animationFillMode: 'both' }}>
        <p className="text-[10px] font-display font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">QUICK FIND</p>
        <h2 className="font-display font-extrabold text-2xl text-gray-900 dark:text-white">Search</h2>
      </div>

      {/* Search input */}
      <div className="relative mb-5">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search videos, modules..."
          className="w-full pl-10 pr-4 py-3.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-body text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 transition-all shadow-sm"
          autoComplete="off"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs font-mono-jet"
          >
            ✕
          </button>
        )}
      </div>

      {/* Empty state */}
      {!query && (
        <div className="text-center py-16 animate-fade-in">
          <Search size={40} className="mx-auto text-gray-200 dark:text-gray-700 mb-4" />
          <p className="font-display font-bold text-gray-400 dark:text-gray-600">Type to search all 757 videos</p>
          <p className="text-xs text-gray-300 dark:text-gray-700 mt-1">Search by video title or module name</p>
        </div>
      )}

      {/* No results */}
      {query && results.length === 0 && (
        <div className="text-center py-16">
          <p className="font-display font-bold text-gray-400 dark:text-gray-600">No results for "{query}"</p>
        </div>
      )}

      {/* Results count */}
      {results.length > 0 && (
        <p className="text-[10px] font-mono-jet text-gray-400 dark:text-gray-600 mb-3 uppercase tracking-widest">
          {results.length} result{results.length !== 1 ? 's' : ''}
        </p>
      )}

      {/* Results list */}
      <div className="space-y-2">
        {results.map(({ unit, mod, ms }, i) => {
          const done = !!completed[unit.id]
          const isVideo = unit.type === 'video'
          return (
            <button
              key={unit.id}
              onClick={() => isVideo && onToggle(unit.id)}
              className={`w-full flex items-center gap-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800
                rounded-xl px-4 py-3.5 text-left hover:border-brand-300 dark:hover:border-brand-700
                hover:shadow-sm transition-all animate-slide-up ${isVideo ? 'cursor-pointer' : 'cursor-default'}`}
              style={{ animationDelay: `${i * 15}ms`, animationFillMode: 'both' }}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all
                ${done ? 'bg-emerald-500 text-white' : 'border-2 border-gray-200 dark:border-gray-700'}`}>
                {done ? <CheckCircle2 size={14} /> : <Circle size={10} className="text-gray-300" />}
              </div>

              <div className="flex-1 min-w-0">
                <p className={`text-xs font-medium leading-snug ${done ? 'line-through text-gray-400 dark:text-gray-600' : 'text-gray-800 dark:text-gray-200'}`}>
                  {unit.name}
                </p>
                <p className="text-[10px] text-gray-400 dark:text-gray-600 font-mono-jet mt-0.5 truncate">{mod.name}</p>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                {isVideo && unit.duration && (
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
    </div>
  )
}
