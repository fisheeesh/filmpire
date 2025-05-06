import { TextField, InputAdornment, Box, useTheme } from "@mui/material"
import { Search as SearchIcon } from "@mui/icons-material"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { searchMovie } from "../features/currentGenreOrCategory"

export default function Search() {
    const theme = useTheme()
    const dispatch = useDispatch()
    const [query, setQuery] = useState('')

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            dispatch(searchMovie(query))
        }
    }

    return (
        <Box sx={{
            display: { xs: 'flex' },
            justifyContent: { xs: 'center' },
            width: { xs: '100%' }
        }}>
            <TextField
                value={query}
                onChange={(e) => { setQuery(e.target.value) }}
                onKeyDown={handleKeyPress}
                variant="standard"
                sx={{
                    color: theme.palette.mode === 'light' && 'black',
                    filter: theme.palette.mode === 'light' && 'invert(1)'
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            />
        </Box>
    )
}
