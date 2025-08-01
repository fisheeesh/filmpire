
import { ArrowBack, Favorite, FavoriteBorderOutlined, Language, MovieCreation, PlusOne, Remove, Theaters } from "@mui/icons-material";
import { Box, Button, ButtonGroup, CircularProgress, Grid, Modal, Rating, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import genreIcons from '../assets/genres';
import { userSelector } from "../features/auth";
import { selectGenreOrCategory } from "../features/currentGenreOrCategory";
import { useGetListQuery, useGetMovieQuery, useGetRecommendationsQuery } from "../services/TMDB";
import MovieList from '../ui/MovieList';
import { moviesApi } from "../utils";

const apiKey = import.meta.env.VITE_TMDB_KEY
const sessionId = localStorage.getItem('session_id')

export default function MovieInformation() {
    const theme = useTheme()
    const navigate = useNavigate()
    const { id } = useParams()
    const { prev } = useSelector(state => state.currentGenreOrCategory)
    const dispatch = useDispatch()
    const { user } = useSelector(userSelector)
    const [isMovieFavorited, setIsMovieFavorited] = useState(false)
    const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false)
    const [open, setOpen] = useState(false)

    const { data, isFetching, error } = useGetMovieQuery(id)
    const { data: favoriteMovies } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId, page: 1 })
    const { data: watchlistMovies } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId, page: 1 })
    const { data: recommendations, isFetching: isFetchingRecommendations } = useGetRecommendationsQuery({ list: 'recommendations', movie_id: id })

    useEffect(() => {
        setIsMovieFavorited(!!favoriteMovies?.results?.find(movie => movie?.id === data?.id))
    }, [favoriteMovies, data])

    useEffect(() => {
        setIsMovieWatchlisted(!!watchlistMovies?.results?.find(movie => movie?.id === data?.id))
    }, [watchlistMovies, data])

    const addToFavorites = async () => {
        await moviesApi.post(`/account/${user.id}/favorite?api_key=${apiKey}&session_id=${sessionId}`, {
            media_type: 'movie',
            media_id: id,
            favorite: !isMovieFavorited
        })

        setIsMovieFavorited(prev => !prev)
    }

    const addToWatchlist = async () => {
        await moviesApi.post(`/account/${user.id}/watchlist?api_key=${apiKey}&session_id=${sessionId}`, {
            media_type: 'movie',
            media_id: id,
            watchlist: !isMovieWatchlisted
        })

        setIsMovieWatchlisted(prev => !prev)
    }


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
            <Grid size={{ xs: 12, md: 4 }}>
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
                    <Typography variant="h6" align="center" gutterBottom>{data?.runtime}min {data?.spoken_languages[0]?.name ? `| Language: ${data?.spoken_languages[0]?.name}` : ''}</Typography>
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
                            gap: { xs: '10px', md: '0' },
                            flexDirection: { xs: 'column', md: 'row' },
                        }}
                    >
                        <Grid sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            flexDirection: { xs: 'column', sm: 'row' },
                        }}>
                            <ButtonGroup size="medium" variant="outlined">
                                <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>Website</Button>
                                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieCreation />}>IMDB</Button>
                                <Button onClick={() => setOpen(true)} endIcon={<Theaters />}>Trailer</Button>
                            </ButtonGroup>
                        </Grid>
                        <Grid sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            flexDirection: { xs: 'column', sm: 'row' },
                        }}>
                            <ButtonGroup size="medium" variant="outlined">
                                <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                                    {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                                </Button>
                                <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>
                                    Watchlist
                                </Button>
                                <Button sx={{ borderColor: 'primary.main' }} onClick={() => {
                                    navigate(-1)
                                    dispatch(selectGenreOrCategory(prev))
                                }} endIcon={<ArrowBack />}>
                                    <Typography sx={{ textDecoration: 'none' }} color="inherit" variant="subtitle2">Back</Typography>
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{ mt: '5rem', width: '100%' }}>
                <Typography variant="h3" gutterBottom align="center">You might also like</Typography>
                
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
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {data?.videos?.results?.length > 0 ? (
                    <Box
                        component="iframe"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        autoPlay
                        sx={{
                            width: { xs: '90%', sm: '70%', md: '50%' },
                            height: { xs: '40%', sm: '50%' },
                            borderRadius: '20px',
                        }}
                        frameBorder={0}
                        title="Trailer"
                        src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
                        allowAutoPlay
                    />
                ) : (
                    <Box>Trailer not available.</Box>
                )}
            </Modal>
        </Grid>
    )
}
