import { NavLink, Outlet, useParams } from 'react-router'
import { Breadcrumb } from 'react-breadcrumbs'
import { events, findEvent } from '../data'

export function EventsLayout() {
  return (
    <Breadcrumb data={{ title: 'Events', pathname: '/events' }}>
      <section className="split">
        <article className="panel">
          <p className="eyebrow">On the calendar</p>
          <h1>Events</h1>
          <p>Nested routes, same pattern as Friends — no special case for depth.</p>
          <ul className="index">
            {events.map((event) => (
              <li key={event.slug}>
                <NavLink to={`/events/${event.slug}`}>
                  <span>{event.name}</span>
                  <em>{event.when}</em>
                </NavLink>
              </li>
            ))}
          </ul>
        </article>
        <Outlet />
      </section>
    </Breadcrumb>
  )
}

export function EventsIndex() {
  return (
    <aside className="panel panel--quiet">
      <h2>Pick an event</h2>
      <p>The current page is never a link. It gets <code>aria-current="page"</code>.</p>
    </aside>
  )
}

export function EventPage() {
  const { name } = useParams()
  const event = findEvent(name)
  if (!event) return <p>Missing event.</p>

  return (
    <Breadcrumb data={{ title: event.name, pathname: `/events/${event.slug}` }}>
      <article className="panel">
        <p className="eyebrow">{event.when}</p>
        <h2>{event.name}</h2>
        <p>{event.note}</p>
      </article>
    </Breadcrumb>
  )
}
