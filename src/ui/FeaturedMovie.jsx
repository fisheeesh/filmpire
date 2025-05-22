import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material"
import { Link } from "react-router-dom"

export default function FeaturedMovie({ movie }) {
    console.log(movie)

    if (!movie) return null

    return (
        <Box component={Link} to={`/movie/${movie?.id}`} sx={{
            mb: '20px',
            display: 'flex',
            justifyContent: 'center',
            height: '490px',
            textDecoration: 'none',
        }}>
            <Card sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', position: 'relative' }}>
                <CardMedia
                    media='picture'
                    alt={movie?.title}
                    image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                    title={movie?.title}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '100%',
                        width: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        backgroundBlendMode: 'darken',
                        // borderRadius: '20px',   
                    }}
                />
                <Box sx={{
                    padding: '20px'
                }}>
                    <CardContent sx={{
                        color: '#fff',
                        width: { xs: '100%', sm: '100%', md: '70%', lg: '40%' },
                        position: 'relative',
                        backgroundColor: 'transparent'
                    }}>
                        <Typography variant="h5" gutterBottom>{movie.title}</Typography>
                        <Typography variant="body2">{movie.overview}</Typography>
                    </CardContent>
                </Box>
            </Card>
        </Box>
    )
}
