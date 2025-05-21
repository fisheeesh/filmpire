import { Grid } from "@mui/material"
import Movie from "./Movie"

export default function MovieList({ movies, numberOfMovies }) {

    return (
        <Grid container sx={{
            display: 'flex',
            flexWrap: 'wrap',
            overflow: 'auto',
            justifyContent: { xs: 'center', sm: 'space-between' }
        }}>
            {
                movies?.results.slice(0, numberOfMovies).map((movie, i) => (
                    <Movie key={i} movie={movie} i={i} />
                ))
            }
        </Grid>
    )
}
