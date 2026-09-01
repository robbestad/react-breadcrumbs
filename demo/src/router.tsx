import { createBrowserRouter, type UIMatch } from 'react-router'
import type { BreadcrumbHandle } from 'react-breadcrumbs'
import { RootLayout } from './layout'
import { HomePage } from './pages/home'
import { EventPage, EventsIndex, EventsLayout } from './pages/events'
import {
  friendLoader,
  FriendPage,
  FriendsIndex,
  FriendsLayout,
} from './pages/friends'
import {
  LocationsIndex,
  LocationsLayout,
  PlacePage,
} from './pages/locations'
import { NotFoundPage } from './pages/not-found'
import type { Friend } from './data'

const friendCrumb: BreadcrumbHandle = {
  crumb: (match: UIMatch) => (match.data as Friend | undefined)?.name ?? 'Friend',
}

function routerBasename() {
  const base = import.meta.env.BASE_URL
  if (!base || base === '/' || base === './') return undefined
  return base.endsWith('/') ? base.slice(0, -1) : base
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    handle: { crumb: 'Home' } satisfies BreadcrumbHandle,
    children: [
      { index: true, Component: HomePage },
      {
        path: 'friends',
        Component: FriendsLayout,
        handle: { crumb: 'Friends' } satisfies BreadcrumbHandle,
        children: [
          { index: true, Component: FriendsIndex },
          {
            path: ':name',
            Component: FriendPage,
            loader: friendLoader,
            hydrateFallbackElement: <p className="hint">Loading friend…</p>,
            handle: friendCrumb,
          },
        ],
      },
      {
        path: 'events',
        Component: EventsLayout,
        handle: { crumb: 'Events' } satisfies BreadcrumbHandle,
        children: [
          { index: true, Component: EventsIndex },
          {
            path: ':name',
            Component: EventPage,
            handle: {
              crumb: (match: UIMatch) => titleFromParam(match.params.name),
            } satisfies BreadcrumbHandle,
          },
        ],
      },
      {
        path: 'locations',
        Component: LocationsLayout,
        handle: { crumb: 'Locations' } satisfies BreadcrumbHandle,
        children: [
          { index: true, Component: LocationsIndex },
          {
            path: ':name',
            Component: PlacePage,
            handle: {
              crumb: (match: UIMatch) => titleFromParam(match.params.name),
            } satisfies BreadcrumbHandle,
          },
        ],
      },
      {
        path: '*',
        Component: NotFoundPage,
        handle: { crumb: 'Not found' } satisfies BreadcrumbHandle,
      },
    ],
  },
], { basename: routerBasename() })

function titleFromParam(value: string | undefined) {
  if (!value) return 'Page'
  return value.charAt(0).toUpperCase() + value.slice(1)
}
