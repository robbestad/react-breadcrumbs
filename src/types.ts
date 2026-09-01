import type { ComponentType, ReactNode } from 'react'
import type { UIMatch } from 'react-router'

export type CrumbData = {
  title: ReactNode
  pathname: string
  search?: string
  state?: unknown
}

export type Crumb = CrumbData & {
  id: string
  linkProps?: Record<string, unknown>
}

export type BreadcrumbSource = 'registered' | 'route' | 'merged'

export type BreadcrumbHandle = {
  crumb?: ReactNode | ((match: UIMatch) => ReactNode)
}

export type BreadcrumbProps = {
  data: CrumbData
  hidden?: boolean
  linkProps?: Record<string, unknown>
  children?: ReactNode
}

export type BreadcrumbLinkProps = {
  to: {
    pathname: string
    search?: string
    state?: unknown
  }
  className?: string
  children?: ReactNode
  [key: string]: unknown
}

export type BreadcrumbWrapperProps = {
  className?: string
  children?: ReactNode
  hidden?: boolean
}

export type BreadcrumbsProps = {
  className?: string
  hidden?: boolean
  separator?: ReactNode
  setCrumbs?: (crumbs: Crumb[]) => Crumb[]
  wrapper?: ComponentType<BreadcrumbWrapperProps>
  linkComponent?: ComponentType<BreadcrumbLinkProps>
  source?: BreadcrumbSource
  children?: ReactNode
}

export type CrumbAction =
  | { type: 'UPSERT'; crumb: Crumb }
  | { type: 'REMOVE'; id: string }
