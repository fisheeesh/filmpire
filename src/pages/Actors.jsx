import { useNavigate, useParams } from "react-router-dom"
import { useGetActorDetailsQuery, useGetMoviesByActorIdQuery } from "../services/TMDB"
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material"
import { ArrowBack } from "@mui/icons-material"
import MovieList from "../ui/MovieList"
import Pagination from "../ui/Pagination"
import { useSelector } from "react-redux"

export default function Actors() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { page } = useSelector(state => state.currentGenreOrCategory)
    const { data, isFetching, error } = useGetActorDetailsQuery(id)
    const { data: movies } = useGetMoviesByActorIdQuery({ id, page })

    if (isFetching) return (
        <Box display='flex' justifyContent='center' alignContent='center'>
            <CircularProgress size='8rem' sx={{ mt: '12rem' }} />
        </Box>
    )
    if (error) return (
        <Box display='flex' justifyContent='center' alignContent='center'>
            <Button color="primary" startIcon={<ArrowBack />} onClick={() => navigate(-1)}>
                Go Back
            </Button>
        </Box>
    )

    return (
        <>
            <Grid container spacing={3}>
                <Grid size={{ lg: 5, xl: 4 }} display="flex" justifyContent="center">
                    <Box
                        sx={{
                            maxWidth: '90%',
                            borderRadius: '20px',
                            objectFit: 'cover',
                            boxShadow: '0.5em 0.5em 1em'
                        }}
                        component='img'
                        src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
                        alt={data?.name}
                    />
                </Grid>
                <Grid size={{ lg: 7, xl: 8 }} sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}>
                    <Typography variant="h2" gutterBottom>{data?.name}</Typography>
                    <Typography variant="h5" gutterBottom>Born: {new Date(data?.birthday).toDateString()}</Typography>
                    <Typography variant="body2" align="justify">{data?.biography || 'Sorry - No biography yet...'}</Typography>
                    <Box sx={{ mt: '2rem', display: 'flex', justifyContent: 'space-around' }}>
                        <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${data?.imdb_id}`}>IMDB</Button>
                        <Button onClick={() => navigate(-1)} color="primary" startIcon={<ArrowBack />}>Back</Button>
                    </Box>
                </Grid>
            </Grid>
            <Box margin='2rem 0'>
                <Typography variant="h2" gutterBottom align="center">Movies</Typography>
                {movies && (
                    <MovieList movies={movies} numberOfMovies={12} />
                )}
                <Pagination totalPages={movies?.total_pages} />
            </Box>
        </>
    )
}
