export function HomePage() {
  return (
    <article className="panel">
      <p className="eyebrow">Automatic trails</p>
      <h1>Where you are, and how you got there.</h1>
      <p className="lede">
        This demo is the v3 rewrite of <code>react-breadcrumbs</code>: React 19, React
        Router 7, no Redux, and markup that a screen reader can actually follow.
      </p>
      <ul className="facts">
        <li>
          <strong>Registered</strong> crumbs come from <code>&lt;Breadcrumb&gt;</code> in
          the tree — the original API, now backed by context.
        </li>
        <li>
          <strong>Route handle</strong> crumbs come from <code>handle.crumb</code> and{' '}
          <code>useMatches()</code>, including loader data.
        </li>
        <li>
          <strong>RTL</strong> is not a special prop. Logical CSS follows{' '}
          <code>dir</code> on the document.
        </li>
      </ul>
      <p>
        Walk Friends, Events, or Locations. Alice’s title is loaded asynchronously. The
        Overlook is hidden from the trail until you publish it.
      </p>
    </article>
  )
}
