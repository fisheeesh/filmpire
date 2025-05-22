import { Grid } from "@mui/material"
import Movie from "./Movie"

export default function MovieList({ movies, numberOfMovies, excludeFirst }) {

    const startFrom = excludeFirst ? 1 : 0

    return (
        <Grid container sx={{
            display: 'flex',
            flexWrap: 'wrap',
            overflow: 'auto',
            justifyContent: { xs: 'center', md: 'space-between' }
        }}>
            {
                movies?.results.slice(startFrom, numberOfMovies).map((movie, i) => (
                    <Movie key={i} movie={movie} i={i} />
                ))
            }
        </Grid>
    )
}
