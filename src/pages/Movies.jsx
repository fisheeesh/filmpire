import React, { useState } from 'react'
import { useGetMoviesQuery } from '../services/TMDB'
import MovieList from '../ui/MovieList'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

export default function Movies() {
    const [page, setPage] = useState(1)
    const { genreIdOrCategoryName } = useSelector(state => state.currentGenreOrCategory)
    const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page })

    if (isFetching) return (
        <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
            <CircularProgress size='4rem' />
        </Box>
    )

    if (!data.results.length) return (
        <Box display='flex' alignItems='center' mt='20px'>
            <Typography variant='h4'>
                No movies that match that name.
                <br />
                Please search for something else.
            </Typography>
        </Box>
    )

    if (error) return 'An error has occured.'

    return (
        <div>
            <MovieList movies={data} />
        </div>
    )
}
