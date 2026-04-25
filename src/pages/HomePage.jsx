import { Clock, Zap, CheckCircle2, Play, ListTodo, Timer } from 'lucide-react'
import StatCard from '../components/StatCard'
import ProgressRing from '../components/ProgressRing'
import { getStats, fmtHours, totalDurMin, totalVideos, assignmentItems } from '../utils/stats'

export default function HomePage({ completed }) {
  const s = getStats(completed)

  const totalH = (totalDurMin / 60).toFixed(1)
  const watchedH = (s.watchedMin / 60).toFixed(1)
  const remainH = (s.remainMin / 60).toFixed(1)

  return (
    <div className="px-4 py-5 max-w-3xl mx-auto space-y-5">
      {/* Header */}
      <div className="animate-slide-up" style={{ animationFillMode: 'both' }}>
        <p className="text-xs font-display font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">LIVE STATISTICS</p>
        <h1 className="font-display font-extrabold text-2xl text-gray-900 dark:text-white">
          Next Level Pro Course
        </h1>
      </div>

      {/* Overall journey card */}
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm animate-slide-up"
        style={{ animationDelay: '40ms', animationFillMode: 'both' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] font-display font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">OVERALL JOURNEY</p>
            <p className="font-display font-extrabold text-4xl text-gradient">{s.pct}%</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {s.watchedVideos} of {totalVideos} videos completed
            </p>
          </div>
          <div className="relative">
            <ProgressRing pct={s.pct} size={88} stroke={7} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display font-bold text-sm text-gradient">{s.pct}%</span>
            </div>
          </div>
        </div>
        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-pink-500 transition-all duration-700"
            style={{ width: `${s.pct}%` }}
          />
        </div>
      </div>

      {/* Stat grid — 2 cols */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          label="Total Course"
          value={`${totalH}`}
          sub="HOURS"
          icon={Clock}
          accent="brand"
          delay={60}
        />
        <StatCard
          label="Work Left"
          value={`${remainH}`}
          sub="HOURS"
          icon={Zap}
          accent="sky"
          delay={80}
        />
        <StatCard
          label="Finished"
          value={s.watchedVideos}
          sub="VIDEOS"
          icon={CheckCircle2}
          accent="green"
          delay={100}
        />
        <StatCard
          label="Tasks"
          value={`${s.tasksDone}`}
          sub={`/ ${s.totalTasks}`}
          icon={ListTodo}
          accent="amber"
          delay={120}
        />
      </div>

      {/* Time watched vs total */}
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm animate-slide-up"
        style={{ animationDelay: '140ms', animationFillMode: 'both' }}
      >
        <p className="text-[10px] font-display font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">TIME TRACKING</p>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-xs font-mono-jet text-gray-500 dark:text-gray-400 mb-1.5">
              <span>Watched</span>
              <span>{watchedH}h / {totalH}h</span>
            </div>
            <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-700"
                style={{ width: `${s.pct}%` }}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400">{watchedH}h watched</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-gray-700" />
            <span className="text-xs text-gray-500 dark:text-gray-400">{remainH}h remaining</span>
          </div>
        </div>
      </div>

      {/* Videos remaining */}
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm animate-slide-up"
        style={{ animationDelay: '160ms', animationFillMode: 'both' }}
      >
        <p className="text-[10px] font-display font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">VIDEO PROGRESS</p>
        <div className="flex items-center justify-between">
          <div className="text-center">
            <div className="font-display font-extrabold text-2xl text-emerald-500">{s.watchedVideos}</div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Completed</div>
          </div>
          <div className="flex-1 px-4">
            <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-500 to-violet-500 transition-all duration-700"
                style={{ width: `${s.pct}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 dark:text-gray-600 mt-1 font-mono-jet">
              <span>0</span>
              <span>{totalVideos}</span>
            </div>
          </div>
          <div className="text-center">
            <div className="font-display font-extrabold text-2xl text-rose-500">{s.remainVideos}</div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Remaining</div>
          </div>
        </div>
      </div>
    </div>
  )
}
