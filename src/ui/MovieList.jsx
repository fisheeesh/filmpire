import { Grid } from "@mui/material"
import Movie from "./Movie"

export default function MovieList({ movies }) {

    return (
        <Grid container sx={{
            display: 'flex',
            flexWrap: 'wrap',
            overflow: 'auto',
            justifyContent: { xs: 'center', sm: 'space-between' }
        }}>
            {
                movies?.results.map((movie, i) => (
                    <Movie key={i} movie={movie} i={i} />
                ))
            }
        </Grid>
    )
}
