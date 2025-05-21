import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import Router from './router/index'
import { Provider } from 'react-redux'
import store from './app/store'

export default function ThemeApp() {
    const theme = createTheme();

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router />
            </ThemeProvider>
        </Provider>
    )
}
