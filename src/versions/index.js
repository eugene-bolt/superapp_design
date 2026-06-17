import main from './main.js'
import fork101 from './fork-1.0.1.js'

export const versions = [main, fork101]

export function getVersion(id) {
  const base = main
  if (!id || id === 'main') return base
  const fork = versions.find(v => v.id === id)
  if (!fork) return base
  return {
    ...base,
    ...fork,
    theme:    { ...base.theme,    ...fork.theme },
    sections: { ...base.sections, ...fork.sections },
    copy:     { ...base.copy,     ...fork.copy },
    boltApps: fork.boltApps ?? base.boltApps,
  }
}
