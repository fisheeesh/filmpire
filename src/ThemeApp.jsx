import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { useMemo } from 'react'
import Router from './router/index'

export default function ThemeApp() {
    const theme = useMemo(() => {
        return createTheme({})
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router />
        </ThemeProvider>
    )
}
