import { StrictMode, useState, type ReactNode } from 'react'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router'
import { afterEach, describe, expect, it } from 'vitest'
import { Breadcrumb } from './breadcrumb'
import { Breadcrumbs } from './breadcrumbs'
import { BreadcrumbProvider } from './context'
import type { BreadcrumbHandle, BreadcrumbLinkProps, BreadcrumbsProps, Crumb } from './types'

const routers: Array<{ dispose: () => void }> = []

afterEach(() => {
  for (const router of routers) router.dispose()
  routers.length = 0
})

function renderTrail(
  ui: ReactNode,
  options: {
    path?: string
    setCrumbs?: (crumbs: Crumb[]) => Crumb[]
    source?: BreadcrumbsProps['source']
    linkComponent?: BreadcrumbsProps['linkComponent']
  } = {},
) {
  const router = createMemoryRouter(
    [
      {
        path: '*',
        element: (
          <BreadcrumbProvider>
            <Breadcrumbs
              setCrumbs={options.setCrumbs}
              source={options.source}
              linkComponent={options.linkComponent}
            />
            {ui}
          </BreadcrumbProvider>
        ),
      },
    ],
    { initialEntries: [options.path ?? '/'] },
  )

  routers.push(router)
  return render(<RouterProvider router={router} />)
}

function nav() {
  return screen.getByRole('navigation', { name: 'Breadcrumb' })
}

function labels() {
  return [...nav().querySelectorAll('li')].map((item) => item.textContent)
}

describe('registered breadcrumbs', () => {
  it('renders crumbs sorted by pathname length', () => {
    renderTrail(
      <Breadcrumb data={{ title: 'Alice', pathname: '/friends/alice' }}>
        <Breadcrumb data={{ title: 'Home', pathname: '/' }}>
          <Breadcrumb data={{ title: 'Friends', pathname: '/friends' }}>
            page
          </Breadcrumb>
        </Breadcrumb>
      </Breadcrumb>,
    )

    expect(labels()).toEqual(['Home›', 'Friends›', 'Alice'])
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Friends' })).toHaveAttribute(
      'href',
      '/friends',
    )
    expect(screen.getByText('Alice')).toHaveAttribute('aria-current', 'page')
    expect(screen.queryByRole('link', { name: 'Alice' })).not.toBeInTheDocument()
  })

  it('removes a crumb when its tree unmounts', async () => {
    const user = userEvent.setup()

    function Probe() {
      const [show, setShow] = useState(true)
      return (
        <>
          <button type="button" onClick={() => setShow(false)}>
            leave
          </button>
          <Breadcrumb data={{ title: 'Home', pathname: '/' }}>
            {show ? (
              <Breadcrumb data={{ title: 'Friends', pathname: '/friends' }}>
                nested
              </Breadcrumb>
            ) : (
              'home only'
            )}
          </Breadcrumb>
        </>
      )
    }

    renderTrail(<Probe />)

    expect(labels()).toEqual(['Home›', 'Friends'])
    await user.click(screen.getByRole('button', { name: 'leave' }))
    expect(labels()).toEqual(['Home'])
  })

  it('updates a crumb when its data changes', async () => {
    const user = userEvent.setup()

    function Probe() {
      const [title, setTitle] = useState('Loading')
      return (
        <>
          <button type="button" onClick={() => setTitle('Alice')}>
            loaded
          </button>
          <Breadcrumb data={{ title, pathname: '/friends/alice' }}>page</Breadcrumb>
        </>
      )
    }

    renderTrail(<Probe />)

    expect(screen.getByText('Loading')).toHaveAttribute('aria-current', 'page')
    await user.click(screen.getByRole('button', { name: 'loaded' }))
    expect(screen.getByText('Alice')).toHaveAttribute('aria-current', 'page')
    expect(screen.queryByText('Loading')).not.toBeInTheDocument()
  })

  it('omits hidden crumbs and restores them', async () => {
    const user = userEvent.setup()

    function Probe() {
      const [hidden, setHidden] = useState(true)
      return (
        <>
          <button type="button" onClick={() => setHidden((value) => !value)}>
            toggle
          </button>
          <Breadcrumb data={{ title: 'Home', pathname: '/' }}>
            <Breadcrumb data={{ title: 'Secret', pathname: '/secret' }} hidden={hidden}>
              page
            </Breadcrumb>
          </Breadcrumb>
        </>
      )
    }

    renderTrail(<Probe />)

    expect(labels()).toEqual(['Home'])
    await user.click(screen.getByRole('button', { name: 'toggle' }))
    expect(labels()).toEqual(['Home›', 'Secret'])
  })

  it('lets setCrumbs rewrite the trail', () => {
    renderTrail(
      <Breadcrumb data={{ title: 'Home', pathname: '/' }}>
        <Breadcrumb data={{ title: 'Friends', pathname: '/friends' }}>
          page
        </Breadcrumb>
      </Breadcrumb>,
      { setCrumbs: (crumbs) => crumbs.filter((crumb) => crumb.pathname !== '/') },
    )

    expect(labels()).toEqual(['Friends'])
  })

  it('forwards linkProps to a custom link component', () => {
    function ExtraLink({ to, className, children, ...rest }: BreadcrumbLinkProps) {
      const href = typeof to === 'string' ? to : to.pathname
      return (
        <a href={href} className={className} {...rest}>
          {children}
        </a>
      )
    }

    renderTrail(
      <Breadcrumb
        data={{ title: 'Home', pathname: '/' }}
        linkProps={{ 'data-extra': 'yes' }}
      >
        <Breadcrumb data={{ title: 'Friends', pathname: '/friends' }}>page</Breadcrumb>
      </Breadcrumb>,
      { linkComponent: ExtraLink },
    )

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'data-extra',
      'yes',
    )
  })

  it('does not duplicate crumbs under Strict Mode', () => {
    const router = createMemoryRouter(
      [
        {
          path: '*',
          element: (
            <StrictMode>
              <BreadcrumbProvider>
                <Breadcrumbs />
                <Breadcrumb data={{ title: 'Home', pathname: '/' }}>page</Breadcrumb>
              </BreadcrumbProvider>
            </StrictMode>
          ),
        },
      ],
      { initialEntries: ['/'] },
    )

    routers.push(router)
    render(<RouterProvider router={router} />)

    expect(within(nav()).getAllByText('Home')).toHaveLength(1)
  })

  it('throws without a provider', () => {
    expect(() =>
      render(<Breadcrumb data={{ title: 'Home', pathname: '/' }}>x</Breadcrumb>),
    ).toThrow(/BreadcrumbProvider/)
  })
})

describe('route handle breadcrumbs', () => {
  it('reads titles from handle.crumb, including loader data', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          handle: { crumb: 'Home' } satisfies BreadcrumbHandle,
          element: (
            <BreadcrumbProvider>
              <Breadcrumbs source="route" />
              <Outlet />
            </BreadcrumbProvider>
          ),
          children: [
            {
              path: 'friends',
              handle: { crumb: 'Friends' } satisfies BreadcrumbHandle,
              element: <Outlet />,
              children: [
                {
                  path: ':name',
                  loader: () => ({ name: 'Alice' }),
                  hydrateFallbackElement: <p>loading</p>,
                  handle: {
                    crumb: (match) =>
                      (match.data as { name: string } | undefined)?.name ?? 'Friend',
                  } satisfies BreadcrumbHandle,
                  element: <p>profile</p>,
                },
              ],
            },
          ],
        },
      ],
      { initialEntries: ['/friends/alice'] },
    )

    routers.push(router)
    render(<RouterProvider router={router} />)

    await waitFor(() => {
      expect(labels()).toEqual(['Home›', 'Friends›', 'Alice'])
    })
  })
})
