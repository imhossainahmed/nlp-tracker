import { LayoutDashboard, BookOpen, Search, CalendarDays } from 'lucide-react'

const tabs = [
  { id: 'home',    icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'modules', icon: BookOpen,         label: 'Modules' },
  { id: 'search',  icon: Search,           label: 'Search' },
  { id: 'planner', icon: CalendarDays,     label: 'Planner' },
]

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass bg-white/90 dark:bg-gray-950/90 border-t border-gray-200 dark:border-gray-800 safe-area-pb">
      <div className="max-w-lg mx-auto flex items-center justify-around px-2">
        {tabs.map(({ id, icon: Icon, label }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`flex flex-col items-center gap-1 py-3 px-4 min-w-0 flex-1 transition-all duration-200 relative group
                ${isActive ? 'text-brand-500' : 'text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400'}`}
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-brand-500 rounded-full" />
              )}
              <span className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              </span>
              <span className={`text-[10px] font-display font-semibold tracking-wide leading-none
                ${isActive ? 'text-brand-500' : ''}`}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
