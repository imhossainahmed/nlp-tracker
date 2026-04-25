import { COURSE_DATA } from '../data/courseData'

// Build flat indexes once
export const allModules = []   // { ms, mod }
export const allUnits = []     // { ms, mod, unit }

COURSE_DATA.forEach(ms => {
  ms.modules.forEach(mod => {
    allModules.push({ ms, mod })
    mod.units.forEach(unit => allUnits.push({ ms, mod, unit }))
  })
})

export const videoUnits  = allUnits.filter(u => u.unit.type === 'video')
export const totalVideos = videoUnits.length
export const totalDurMin = videoUnits.reduce((s, u) => s + (u.unit.duration || 0), 0)
export const nonVideoUnits = allUnits.filter(u => u.unit.type !== 'video')
// Count assignment-type items only (post + assignment)
export const assignmentItems = allUnits.filter(u => ['assignment', 'quiz'].includes(u.unit.type))

export function getStats(completed) {
  const watchedVideos = videoUnits.filter(u => completed[u.unit.id]).length
  const watchedMin    = videoUnits.filter(u => completed[u.unit.id]).reduce((s, u) => s + (u.unit.duration || 0), 0)
  const remainMin     = totalDurMin - watchedMin
  const tasksDone     = assignmentItems.filter(u => completed[u.unit.id]).length
  return {
    watchedVideos,
    watchedMin,
    remainMin,
    remainVideos: totalVideos - watchedVideos,
    tasksDone,
    totalTasks: assignmentItems.length,
    pct: totalVideos > 0 ? Math.round(watchedVideos / totalVideos * 100) : 0,
  }
}

export function fmtHours(min) {
  const h = Math.floor(min / 60)
  const m = min % 60
  if (h === 0) return `${m}m`
  if (m === 0) return `${h}h`
  return `${h}.${Math.round(m / 6)}h`  // e.g. 160.9h
}

export function fmtHoursFull(min) {
  const h = Math.floor(min / 60)
  const m = min % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

export function getModuleStats(mod, completed) {
  const videos = mod.units.filter(u => u.type === 'video')
  const tasks  = mod.units.filter(u => ['assignment', 'quiz'].includes(u.type))
  const vDone  = videos.filter(u => completed[u.id]).length
  const dur    = videos.reduce((s, u) => s + (u.duration || 0), 0)
  return {
    vTotal: videos.length,
    vDone,
    tasks: tasks.length,
    dur,
    pct: videos.length > 0 ? Math.round(vDone / videos.length * 100) : 0,
    allDone: videos.length > 0 && vDone === videos.length,
  }
}
