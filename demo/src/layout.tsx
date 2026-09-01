import { NavLink, Outlet } from 'react-router'
import { Breadcrumb, BreadcrumbProvider, Breadcrumbs } from 'react-breadcrumbs'
import { ControlsProvider, useControls } from './controls'
import type { BreadcrumbSource } from 'react-breadcrumbs'

const sources: { id: BreadcrumbSource; label: string }[] = [
  { id: 'registered', label: 'Registered' },
  { id: 'route', label: 'Route handle' },
  { id: 'merged', label: 'Merged' },
]

export function RootLayout() {
  return (
    <ControlsProvider>
      <BreadcrumbProvider>
        <AppShell />
      </BreadcrumbProvider>
    </ControlsProvider>
  )
}

function AppShell() {
  const { source, setSource, rtl, setRtl } = useControls()

  return (
    <Breadcrumb data={{ title: 'Home', pathname: '/' }}>
      <div className="shell">
        <header className="mast">
          <div className="mast__brand">
            <p className="mast__kicker">react-breadcrumbs v3</p>
            <a className="mast__title" href="#content">
              The trail
            </a>
          </div>
          <nav className="mast__nav" aria-label="Sections">
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/friends">Friends</NavLink>
            <NavLink to="/events">Events</NavLink>
            <NavLink to="/locations">Locations</NavLink>
          </nav>
          <div className="mast__tools">
            <fieldset className="seg">
              <legend className="visually-hidden">Breadcrumb source</legend>
              {sources.map((item) => (
                <label key={item.id} className={source === item.id ? 'is-active' : ''}>
                  <input
                    type="radio"
                    name="source"
                    value={item.id}
                    checked={source === item.id}
                    onChange={() => setSource(item.id)}
                  />
                  {item.label}
                </label>
              ))}
            </fieldset>
            <label className="toggle">
              <input
                type="checkbox"
                checked={rtl}
                onChange={(event) => setRtl(event.target.checked)}
              />
              RTL
            </label>
          </div>
        </header>

        <Breadcrumbs className="trail" source={source} />

        <main id="content" className="stage">
          <Outlet />
        </main>
      </div>
    </Breadcrumb>
  )
}
