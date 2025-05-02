import { CssBaseline } from '@mui/material'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router/index.jsx'


createRoot(document.getElementById('root')).render(
  <>
    <CssBaseline />
    <Router />
  </>
)
