import { useMemo } from 'react'
import { useMatches, type UIMatch } from 'react-router'
import { sortCrumbs } from './sort-crumbs'
import type { BreadcrumbHandle, Crumb } from './types'

function readCrumb(
  match: UIMatch<unknown, BreadcrumbHandle | undefined>,
): Crumb | null {
  const handle = match.handle
  if (!handle || handle.crumb == null) return null

  const title =
    typeof handle.crumb === 'function' ? handle.crumb(match) : handle.crumb

  if (title == null) return null

  return {
    id: match.id,
    title,
    pathname: match.pathname,
  }
}

export function useRouteCrumbs(): Crumb[] {
  const matches = useMatches() as UIMatch<unknown, BreadcrumbHandle | undefined>[]

  return useMemo(
    () =>
      sortCrumbs(
        matches
          .map(readCrumb)
          .filter((crumb): crumb is Crumb => crumb !== null),
      ),
    [matches],
  )
}
