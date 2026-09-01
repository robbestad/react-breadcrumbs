import type { ComponentType, ReactNode } from 'react'
import { NavLink } from 'react-router'
import { useRegisteredCrumbs } from './context'
import { mergeCrumbs } from './sort-crumbs'
import type {
  BreadcrumbLinkProps,
  BreadcrumbWrapperProps,
  BreadcrumbsProps,
  Crumb,
} from './types'
import { useRouteCrumbs } from './use-route-crumbs'

const block = 'breadcrumbs'

function DefaultWrapper({ className, children, hidden }: BreadcrumbWrapperProps) {
  return (
    <nav aria-label="Breadcrumb" className={className} hidden={hidden}>
      {children}
    </nav>
  )
}

function DefaultLink({ to, className, children, ...rest }: BreadcrumbLinkProps) {
  return (
    <NavLink to={to} className={className} end aria-current={false} {...rest}>
      {children}
    </NavLink>
  )
}

function selectCrumbs(
  source: BreadcrumbsProps['source'],
  registered: Crumb[],
  route: Crumb[],
): Crumb[] {
  if (source === 'route') return route
  if (source === 'merged') return mergeCrumbs(registered, route)
  return registered
}

export function Breadcrumbs({
  className = '',
  hidden = false,
  separator = '›',
  setCrumbs,
  wrapper: Wrapper = DefaultWrapper,
  linkComponent: LinkComponent = DefaultLink as ComponentType<BreadcrumbLinkProps>,
  source = 'registered',
  children,
}: BreadcrumbsProps) {
  const registered = useRegisteredCrumbs()
  const route = useRouteCrumbs()
  let crumbs = selectCrumbs(source, registered, route)
  if (setCrumbs) crumbs = setCrumbs(crumbs)

  const hiddenMod = hidden ? ` ${block}--hidden` : ''

  return (
    <div className={className}>
      <Wrapper className={`${block}${hiddenMod}`} hidden={hidden}>
        <ol className={`${block}__inner`}>
          {crumbs.map((crumb, index) => (
            <CrumbItem
              key={crumb.id}
              crumb={crumb}
              isLast={index === crumbs.length - 1}
              separator={separator}
              LinkComponent={LinkComponent}
            />
          ))}
        </ol>
      </Wrapper>
      {children}
    </div>
  )
}

function CrumbItem({
  crumb,
  isLast,
  separator,
  LinkComponent,
}: {
  crumb: Crumb
  isLast: boolean
  separator: ReactNode
  LinkComponent: ComponentType<BreadcrumbLinkProps>
}) {
  return (
    <li className={`${block}__section`}>
      {isLast ? (
        <span className={`${block}__crumb ${block}__crumb--active`} aria-current="page">
          {crumb.title}
        </span>
      ) : (
        <LinkComponent
          className={`${block}__crumb`}
          to={{
            pathname: crumb.pathname,
            search: crumb.search,
            state: crumb.state,
          }}
          {...crumb.linkProps}
        >
          {crumb.title}
        </LinkComponent>
      )}
      {isLast ? null : (
        <span className={`${block}__separator`} aria-hidden="true">
          {separator}
        </span>
      )}
    </li>
  )
}
