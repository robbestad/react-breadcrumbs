import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react'
import { sortCrumbs } from './sort-crumbs'
import type { Crumb, CrumbAction } from './types'

const StateContext = createContext<Crumb[] | null>(null)
const DispatchContext = createContext<Dispatch<CrumbAction> | null>(null)

function crumbsReducer(state: Crumb[], action: CrumbAction): Crumb[] {
  switch (action.type) {
    case 'UPSERT': {
      const index = state.findIndex((crumb) => crumb.id === action.crumb.id)
      if (index === -1) return [...state, action.crumb]
      const next = state.slice()
      next[index] = action.crumb
      return next
    }
    case 'REMOVE':
      return state.filter((crumb) => crumb.id !== action.id)
    default:
      return state
  }
}

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const [crumbs, dispatch] = useReducer(crumbsReducer, [])

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={crumbs}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export function useBreadcrumbDispatch(): Dispatch<CrumbAction> {
  const dispatch = useContext(DispatchContext)
  if (!dispatch) {
    throw new Error('Breadcrumb components must be used within a <BreadcrumbProvider>.')
  }
  return dispatch
}

export function useRegisteredCrumbs(): Crumb[] {
  const crumbs = useContext(StateContext)
  const sorted = useMemo(() => sortCrumbs(crumbs ?? []), [crumbs])
  if (!crumbs) {
    throw new Error('Breadcrumb components must be used within a <BreadcrumbProvider>.')
  }
  return sorted
}
