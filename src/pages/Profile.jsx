/* eslint-disable no-unused-vars */
//* Get access to profile name or id from redux state
//* display in the profile component

import { useSelector } from "react-redux"
import { userSelector } from "../features/auth"
import { Box, Button, Typography } from "@mui/material"
import { ExitToApp } from "@mui/icons-material"

export default function Profile() {
    const { user } = useSelector(userSelector)
    const favoritesMovies = []

    const logoutUser = () => {
        localStorage.clear()
        window.location.href = '/'
    }

    return (
        <Box>
            <Box display='flex' justifyContent='space-between'>
                <Typography variant="h4" gutterBottom>My Profile</Typography>

                <Button color="inherit" onClick={logoutUser}>
                    Logout &nbsp; <ExitToApp />
                </Button>
            </Box>
            {!favoritesMovies.length ? (
                <Typography variant="h5">Add favorites or wishlist some movie to see them here.!</Typography>
            ) : (
                <Box>
                    FAVORITE MOVIES
                </Box>
            )}
        </Box>
    )
}
