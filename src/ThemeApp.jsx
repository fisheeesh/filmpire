import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import store from './app/store';
import Router from './router/index';
import ToggleColorModeProvider from './utils/ToggleColorMode';

export default function ThemeApp() {

    return (
        <Provider store={store}>
            <ToggleColorModeProvider>
                <CssBaseline />
                <Router />
            </ToggleColorModeProvider>
        </Provider>
    )
}
