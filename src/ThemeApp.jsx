import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { useMemo } from 'react'
import Router from './router/index'
import { Provider } from 'react-redux'
import store from './app/store'

export default function ThemeApp() {
    const theme = useMemo(() => {
        return createTheme({})
    }, [])

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router />
            </ThemeProvider>
        </Provider>
    )
}
