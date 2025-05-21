import { useNavigate, useParams } from "react-router-dom"
import { useGetActorDetailsQuery } from "../services/TMDB"
import { Box, Button, CircularProgress } from "@mui/material"
import { ArrowBack } from "@mui/icons-material"

export default function Actors() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data, isFetching, error } = useGetActorDetailsQuery(id)

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
        <div>
            actors {id}
        </div>
    )
}
