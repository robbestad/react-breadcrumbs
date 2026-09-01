import { describe, expect, it } from 'vitest'
import { mergeCrumbs, sortCrumbs } from './sort-crumbs'
import type { Crumb } from './types'

function crumb(pathname: string, title = pathname, id = pathname): Crumb {
  return { id, pathname, title }
}

describe('sortCrumbs', () => {
  it('orders by pathname length', () => {
    const sorted = sortCrumbs([
      crumb('/friends/alice'),
      crumb('/'),
      crumb('/friends'),
    ])
    expect(sorted.map((item) => item.pathname)).toEqual([
      '/',
      '/friends',
      '/friends/alice',
    ])
  })
})

describe('mergeCrumbs', () => {
  it('lets registered crumbs override route crumbs on the same path', () => {
    const merged = mergeCrumbs(
      [crumb('/friends', 'Registered Friends')],
      [crumb('/friends', 'Route Friends'), crumb('/', 'Home')],
    )
    expect(merged.map((item) => item.title)).toEqual([
      'Home',
      'Registered Friends',
    ])
  })
})
