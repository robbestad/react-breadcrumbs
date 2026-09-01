import { NavLink, Outlet, useLoaderData, useParams } from 'react-router'
import { Breadcrumb } from 'react-breadcrumbs'
import { findFriend, friends, wait, type Friend } from '../data'

export function FriendsLayout() {
  return (
    <Breadcrumb data={{ title: 'Friends', pathname: '/friends' }}>
      <section className="split">
        <article className="panel">
          <p className="eyebrow">People on the path</p>
          <h1>Friends</h1>
          <p>Each profile registers its own crumb. Alice’s name arrives from a loader.</p>
          <ul className="index">
            {friends.map((friend) => (
              <li key={friend.slug}>
                <NavLink to={`/friends/${friend.slug}`}>
                  <span>{friend.name}</span>
                  <em>{friend.role}</em>
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

export function FriendsIndex() {
  return (
    <aside className="panel panel--quiet">
      <h2>Pick a friend</h2>
      <p>The trail will grow by one crumb, titled with their name.</p>
    </aside>
  )
}

export async function friendLoader({ params }: { params: { name?: string } }) {
  await wait(120)
  const friend = findFriend(params.name)
  if (!friend) throw new Response('Not found', { status: 404 })
  return friend
}

export function FriendPage() {
  const friend = useLoaderData() as Friend
  const { name } = useParams()

  return (
    <Breadcrumb data={{ title: friend.name, pathname: `/friends/${name}` }}>
      <article className="panel">
        <p className="eyebrow">{friend.role}</p>
        <h2>{friend.name}</h2>
        <p>{friend.note}</p>
        <p className="hint">
          Title came from a route loader. Switch the source to “Route handle” to see the
          same name via <code>handle.crumb(match)</code>.
        </p>
      </article>
    </Breadcrumb>
  )
}
