import { Breadcrumb } from 'react-breadcrumbs'
import { Link, useLocation } from 'react-router'

export function NotFoundPage() {
  const { pathname } = useLocation()
  return (
    <Breadcrumb data={{ title: 'Not found', pathname }}>
      <article className="panel">
        <p className="eyebrow">Dead end</p>
        <h1>This path is not on the map.</h1>
        <p>
          <Link to="/">Return home</Link>
        </p>
      </article>
    </Breadcrumb>
  )
}
