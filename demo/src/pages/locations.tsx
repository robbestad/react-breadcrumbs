import { useState } from 'react'
import { NavLink, Outlet, useParams } from 'react-router'
import { Breadcrumb } from 'react-breadcrumbs'
import { findPlace, places } from '../data'

export function LocationsLayout() {
  return (
    <Breadcrumb data={{ title: 'Locations', pathname: '/locations' }}>
      <section className="split">
        <article className="panel">
          <p className="eyebrow">Places on the map</p>
          <h1>Locations</h1>
          <p>
            Overlook starts hidden. Open it, then publish it to the trail with the
            checkbox — the <code>hidden</code> prop from v2, still here.
          </p>
          <ul className="index">
            {places.map((place) => (
              <li key={place.slug}>
                <NavLink to={`/locations/${place.slug}`}>
                  <span>{place.name}</span>
                  <em>{place.region}</em>
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

export function LocationsIndex() {
  return (
    <aside className="panel panel--quiet">
      <h2>Pick a place</h2>
      <p>Turn on RTL in the header and the separators follow the reading direction.</p>
    </aside>
  )
}

export function PlacePage() {
  const { name } = useParams()
  const place = findPlace(name)
  const [hidden, setHidden] = useState(Boolean(place?.hiddenByDefault))

  if (!place) return <p>Missing place.</p>

  return (
    <Breadcrumb
      data={{ title: place.name, pathname: `/locations/${place.slug}` }}
      hidden={hidden}
    >
      <article className="panel">
        <p className="eyebrow">{place.region}</p>
        <h2>{place.name}</h2>
        <p>{place.note}</p>
        {place.hiddenByDefault ? (
          <label className="toggle toggle--block">
            <input
              type="checkbox"
              checked={!hidden}
              onChange={(event) => setHidden(!event.target.checked)}
            />
            Show Overlook on the trail
          </label>
        ) : null}
      </article>
    </Breadcrumb>
  )
}
