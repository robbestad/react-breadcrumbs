import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from './router'
import 'react-breadcrumbs/styles.css'
import './styles.css'

const root = document.getElementById('app')
if (!root) throw new Error('Missing #app element')

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
