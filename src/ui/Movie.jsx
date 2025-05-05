import { Grid, Grow, Typography, Tooltip, Rating, useTheme } from "@mui/material"
import { Link } from "react-router-dom"

export default function Movie({ movie, i }) {
    const theme = useTheme()

    return (
        <Grid sx={{ gridColumn: 'span 2', padding: '10px' }}>
            <Grow in key={i} timeout={(i + 1) * 250}>
                <Link style={{
                    fontWeight: 'bolder',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                    '&:hover': {
                        cursor: 'pointer',

                    }
                }}
                    to={`/movie/${movie.id}`}>
                    <img
                        className="movie-poster"
                        style={{
                            borderRadius: '20px',
                            height: '300px',
                            marginBottom: '10px',
                        }}
                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://www.fillmurray.com/200/300'} alt={movie.title} />
                    <Typography
                        variant="h5"
                        sx={{
                            color: theme.palette.text.primary,
                            textOverflow: 'ellipsis',
                            width: '230px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            // marginTop: 'px',
                            mb: 0,
                            textAlign: 'center'
                        }}
                    >
                        {movie.title}
                    </Typography>
                    <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
                        <div>
                            <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
                        </div>
                    </Tooltip>
                </Link>
            </Grow>
        </Grid>
    )
}
