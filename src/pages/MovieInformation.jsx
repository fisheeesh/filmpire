import { Link, useParams } from "react-router-dom"
import { useGetMovieQuery, useGetRecommendationsQuery } from "../services/TMDB"
import { Box, Button, ButtonGroup, CircularProgress, Grid, Modal, Rating, Typography, useTheme } from "@mui/material"
import genreIcons from '../assets/genres';
import { useDispatch } from "react-redux";
import MovieList from '../ui/MovieList'
import { selectGenreOrCategory } from "../features/currentGenreOrCategory";
import { ArrowBack, Favorite, FavoriteBorderOutlined, Language, MovieCreation, PlusOne, Remove, Theaters } from "@mui/icons-material";
import { useState } from "react";

export default function MovieInformation() {
    const theme = useTheme()
    const { id } = useParams()
    const { data, isFetching, error } = useGetMovieQuery(id)
    const dispatch = useDispatch()
    const isMovieFavorited = true
    const isMovieWatchlisted = false
    const [open, setOpen] = useState(false)

    const { data: recommendations, isFetching: isFetchingRecommendations } = useGetRecommendationsQuery({ list: 'recommendations', movie_id: id })

    console.log(data?.results)

    if (isFetching) return (
        <Box display='flex' justifyContent='center' alignContent='center'>
            <CircularProgress size='8rem' sx={{ mt: '12rem' }} />
        </Box>
    )
    if (error) return (
        <Box display='flex' justifyContent='center' alignContent='center'>
            <Link to='/'>Something has done wrong - Go Back :(</Link>
        </Box>
    )

    return (
        <Grid container sx={{
            display: 'flex',
            justifyContent: 'space-around',
            margin: '10px 0 !important',
            flexDirection: { sm: 'column', md: 'row' },
            flexWrap: 'wrap',
        }}>
            <Grid size={{ sm: 12, md: 4 }}>
                <Box
                    component="img"
                    src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
                    alt={`${data?.title} Poster`}
                    sx={{
                        width: { sm: '100%', md: '80%' },
                        height: { xs: '350px', sm: 'auto' },
                        borderRadius: '20px',
                        boxShadow: '0.5em 1em 1em rgb(64, 64, 70)',
                        mx: 'auto',
                        mb: '30px',
                        display: 'block',
                    }}
                />
            </Grid>
            <Grid container direction='column' size={{ lg: 7 }}>
                <Typography variant="h3" align="center" gutterBottom>{data?.title} ({data?.release_date?.split('-')[0]})</Typography>
                <Typography variant="h5" align="center" gutterBottom>{data?.tagline}</Typography>
                <Grid sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    margin: '10px 0 !important',
                    flexDirection: { xs: 'column', sm: 'row' },
                    flexWrap: 'wrap',
                }}>
                    <Box display='flex' alignItems={'center'} justifyContent='center'>
                        <Rating readOnly value={data?.vote_average / 2}></Rating>
                        <Typography variant="subtitle1" gutterBottom sx={{ ml: '10px' }}>{data?.vote_average} / 10</Typography>
                    </Box>
                    <Typography variant="h6" align="center" gutterBottom>{data?.runtime}min {data?.spoken_languages.length > 0 ? `/ ${data?.spoken_languages[0].name}` : ''}</Typography>
                </Grid>
                <Grid sx={{
                    margin: '10px 0 !important',
                    display: 'flex',
                    justifyContent: 'space-around',
                    gap: { xs: '10px', md: '0' },
                    flexWrap: 'wrap',
                }}>
                    {data?.genres?.map((genre, i) => (
                        <Link
                            key={i}
                            to='/'
                            onClick={() => dispatch(selectGenreOrCategory(genre.id))}
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none' }}>
                            <img src={genreIcons[genre.name.toLowerCase()]} style={{
                                filter: theme.palette.mode === 'light' ? 'dark' : 'invert(1)',
                                marginRight: '10px',
                            }} height={30} alt="" />
                            <Typography color="primary" variant="subtitle1">{genre?.name}</Typography>
                        </Link>
                    ))}
                </Grid>
                <Typography variant="h5" gutterBottom sx={{ mt: '10px' }}>Overview</Typography>
                <Typography sx={{ mb: '2rem' }}>{data?.overview}</Typography>
                <Typography variant="h5" gutterBottom>Top Cast</Typography>
                <Grid container spacing={2}>
                    {data && data.credits.cast.map((character, i) => (
                        character.profile_path && <Grid
                            key={i}
                            size={{ xs: 4, md: 2 }}
                            component={Link} to={`/actors/${character?.id}`}
                            sx={{
                                textDecoration: 'none',
                            }}
                        >
                            <Box
                                component='img'
                                src={`https://image.tmdb.org/t/p/w500/${character?.profile_path}`}
                                alt={character?.name}
                                sx={{
                                    width: '100%',
                                    maxWidth: '7em',
                                    height: '8em',
                                    objectFit: 'cover',
                                    borderRadius: '10px',
                                }}
                            />
                            <Typography color="textPrimary">{character.name}</Typography>
                            <Typography color="textSecondary">{character.character.split('/')[0]}</Typography>
                        </Grid>
                    )).slice(0, 6)}
                </Grid>
                <Grid container sx={{ mt: '2rem' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            gap: { xs: '10px', sm: '0' },
                            flexDirection: { xs: 'column', sm: 'row' },
                        }}
                    >
                        <Grid size={{ xs: 12, sm: 6 }} sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            flexDirection: { xs: 'column', sm: 'row' },
                        }}>
                            <ButtonGroup size="medium" variant="outlined">
                                <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>Website</Button>
                                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieCreation />}>IMDB</Button>
                                <Button onClick={() => setOpen(true)} href="#" endIcon={<Theaters />}>Trailer</Button>
                            </ButtonGroup>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }} sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            flexDirection: { xs: 'column', sm: 'row' },
                        }}>
                            <ButtonGroup size="medium" variant="outlined">
                                <Button onClick={() => { }} href="#" endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                                    {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                                </Button>
                                <Button onClick={() => { }} href="#" endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>
                                    Watchlist
                                </Button>
                                <Button sx={{ borderColor: 'primary.main' }} endIcon={<ArrowBack />}>
                                    <Typography sx={{ textDecoration: 'none' }} component={Link} to={'/'} color="inherit" variant="subtitle2">Back</Typography>
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{ mt: '5rem', width: '100%' }}>
                <Typography variant="h3" gutterBottom align="center">You might also like</Typography>
                {/* Loop through the recommended movies... */}
                {
                    isFetchingRecommendations && <Box display='flex' justifyContent='center' alignContent='center'>
                        <CircularProgress size='4rem' sx={{ mt: '5rem' }} />
                    </Box>
                }
                {
                    (!isFetchingRecommendations && recommendations) ?
                        <MovieList movies={recommendations} numberOfMovies={8} /> :
                        <Box>Sorry nothing was found.</Box>
                }
            </Box>
            <Modal
                closeAfterTransition
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                open={open}
                onClose={() => setOpen(false)}
            >
                {data.videos?.results.length > 0 && (
                    <Box
                        component="iframe"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        autoPlay
                        sx={{
                            width: { xs: '90%', sm: '70%', md:'50%' },
                            height: { xs: '40%', sm: '50%' },
                            borderRadius: '20px',
                        }}
                        frameBorder={0}
                        title="Trailer"
                        src={`https://www.youtube.com/embed/${data.videos?.results[0].key}`}
                        allowAutoPlay
                    />
                )}
            </Modal>
        </Grid>
    )
}
