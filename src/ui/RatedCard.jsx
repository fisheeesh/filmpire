import { Box, Typography } from '@mui/material'
import Movie from './Movie'

export default function RatedCard({ title, data }) {
    return (
        <Box>
            <Typography variant='h5' gutterBottom>{title}</Typography>
            <Box display='flex' flexWrap='wrap'>
                {data?.results?.map((movie, i) => (
                    <Movie key={movie.id} movie={movie} i={i} />
                ))}
            </Box>
        </Box>
    )
}
