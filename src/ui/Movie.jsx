import { Grid, Grow, Typography, Tooltip, Rating, useTheme } from "@mui/material"

export default function Movie({ movie, i }) {
    const theme = useTheme()

    return (
        <Grid sx={{ gridColumn: 'span 2', padding: '10px' }}>
            <Typography
                variant="h5"
                sx={{
                    color: theme.palette.text.primary,
                    textOverflow: 'ellipsis',
                    width: '230px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    mt: '10px',
                    mb: 0,
                    textAlign: 'center'
                }}
            >{movie.title}</Typography>
        </Grid>
    )
}
