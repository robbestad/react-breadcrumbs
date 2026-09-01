import { useEffect, useRef } from 'react'
import { useBreadcrumbDispatch } from './context'
import type { BreadcrumbProps } from './types'

export function Breadcrumb({
  data,
  hidden = false,
  linkProps,
  children,
}: BreadcrumbProps) {
  const dispatch = useBreadcrumbDispatch()
  const id = useRef(crypto.randomUUID()).current

  // Depend on data fields, not the `data` object identity (new each render).
  useEffect(() => {
    if (hidden) {
      dispatch({ type: 'REMOVE', id })
      return
    }

    dispatch({
      type: 'UPSERT',
      crumb: { id, ...data, linkProps },
    })

    return () => {
      dispatch({ type: 'REMOVE', id })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- listed fields above
  }, [
    data.pathname,
    data.search,
    data.state,
    data.title,
    dispatch,
    hidden,
    id,
    linkProps,
  ])

  return children
}
