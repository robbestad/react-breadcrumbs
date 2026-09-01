import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { BreadcrumbSource } from 'react-breadcrumbs'

type Controls = {
  source: BreadcrumbSource
  setSource: (source: BreadcrumbSource) => void
  rtl: boolean
  setRtl: (rtl: boolean) => void
}

const ControlsContext = createContext<Controls | null>(null)

export function ControlsProvider({ children }: { children: ReactNode }) {
  const [source, setSource] = useState<BreadcrumbSource>('registered')
  const [rtl, setRtl] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    root.dir = rtl ? 'rtl' : 'ltr'
    return () => {
      root.dir = 'ltr'
    }
  }, [rtl])

  const value = useMemo(
    () => ({ source, setSource, rtl, setRtl }),
    [source, rtl],
  )

  return <ControlsContext.Provider value={value}>{children}</ControlsContext.Provider>
}

export function useControls() {
  const value = useContext(ControlsContext)
  if (!value) throw new Error('useControls must be used within ControlsProvider')
  return value
}
