import { Box, CircularProgress, Typography, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import { useGetMoviesQuery } from '../services/TMDB'
import MovieList from '../ui/MovieList'
import Pagination from '../ui/Pagination'
import FeaturedMovie from '../ui/FeaturedMovie'

export default function Movies() {
    const { genreIdOrCategoryName, searchQuery, page } = useSelector(state => state.currentGenreOrCategory)
    const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery })
    const lg = useMediaQuery(theme => theme.breakpoints.only('lg'))

    const numberOfMovies = lg ? 17 : 19

    if (isFetching) return (
        <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
            <CircularProgress size='4rem' />
        </Box>
    )

    if (!data?.results.length) return (
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
        <>
            <FeaturedMovie movie={data.results[0]} />
            <MovieList movies={data} numberOfMovies={numberOfMovies} excludeFirst />
            <Pagination totalPages={data.total_pages} />
        </>
    )
}
