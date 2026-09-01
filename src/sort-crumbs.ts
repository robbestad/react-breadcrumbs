import type { Crumb } from './types'

export function sortCrumbs(crumbs: Crumb[]): Crumb[] {
  return [...crumbs].sort((a, b) => a.pathname.length - b.pathname.length)
}

export function mergeCrumbs(registered: Crumb[], route: Crumb[]): Crumb[] {
  const byPath = new Map<string, Crumb>()
  for (const crumb of route) byPath.set(crumb.pathname, crumb)
  for (const crumb of registered) byPath.set(crumb.pathname, crumb)
  return sortCrumbs([...byPath.values()])
}
