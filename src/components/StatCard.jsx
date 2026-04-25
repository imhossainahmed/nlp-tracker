export default function StatCard({ label, value, sub, icon: Icon, accent = 'brand', delay = 0 }) {
  const accents = {
    brand:   'from-brand-500 to-violet-500',
    green:   'from-emerald-400 to-teal-500',
    red:     'from-rose-400 to-pink-500',
    amber:   'from-amber-400 to-orange-500',
    sky:     'from-sky-400 to-blue-500',
    purple:  'from-purple-400 to-fuchsia-500',
  }
  const textColors = {
    brand:   'text-brand-500',
    green:   'text-emerald-500',
    red:     'text-rose-500',
    amber:   'text-amber-500',
    sky:     'text-sky-500',
    purple:  'text-purple-500',
  }
  const bgColors = {
    brand:   'bg-brand-500/10 dark:bg-brand-500/15',
    green:   'bg-emerald-500/10 dark:bg-emerald-500/15',
    red:     'bg-rose-500/10 dark:bg-rose-500/15',
    amber:   'bg-amber-500/10 dark:bg-amber-500/15',
    sky:     'bg-sky-500/10 dark:bg-sky-500/15',
    purple:  'bg-purple-500/10 dark:bg-purple-500/15',
  }
  const grad = accents[accent] || accents.brand
  const tc   = textColors[accent] || textColors.brand
  const bg   = bgColors[accent] || bgColors.brand

  return (
    <div
      className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 animate-slide-up relative overflow-hidden"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      {/* top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${grad}`} />

      <div className="flex items-start justify-between mb-3">
        <p className="text-[10px] font-display font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">{label}</p>
        {Icon && (
          <div className={`w-8 h-8 rounded-xl ${bg} flex items-center justify-center`}>
            <Icon size={15} className={tc} strokeWidth={2} />
          </div>
        )}
      </div>
      <div className={`font-display font-extrabold text-3xl ${tc} leading-none`}>{value}</div>
      {sub && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 font-body">{sub}</p>}
    </div>
  )
}
