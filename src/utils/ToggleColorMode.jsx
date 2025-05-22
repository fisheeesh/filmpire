/* eslint-disable react-refresh/only-export-components */
import { createTheme, ThemeProvider } from "@mui/material"
import { createContext, useContext, useMemo, useState } from "react"

const ColorModeContext = createContext()

export default function ToggleColorMode({ children }) {
    const [mode, setMode] = useState('dark')

    const theme = useMemo(() => createTheme({
        palette: { mode }
    }), [mode])

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
        // localStorage.setItem('theme', mode === 'light' ? 'dark' : 'light')
    }

    return (
        <ColorModeContext.Provider value={{ mode, setMode, toggleColorMode }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export const useToggleColorMode = () => {
    const constext = useContext(ColorModeContext)
    if (!constext) {
        throw new Error('useToggleColorMode must be used within a ColorModeProvider')
    }
    return constext
}
