
//* Get access to profile name or id from redux state
//* display in the profile component

import { useSelector } from "react-redux"
import { userSelector } from "../features/auth"
import { Box, Button, Typography } from "@mui/material"
import { ExitToApp } from "@mui/icons-material"
import { useGetListQuery } from "../services/TMDB"
import RatedCard from "../ui/RatedCard"
import { useEffect } from "react"

const sessionId = localStorage.getItem('session_id')

export default function Profile() {
    const { user } = useSelector(userSelector)
    const { data: favoritesMovies, refetch: refetchFavorites } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId, page: 1 })
    const { data: watchlistMovies, refetch: refetchWatchLists } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId, page: 1 })

    useEffect(() => {
        refetchFavorites()
        refetchWatchLists()
    }, [refetchFavorites, refetchWatchLists])

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
            {!favoritesMovies?.results?.length && !watchlistMovies?.results?.length ? (
                <Typography variant="h5">Add favorites or wishlist some movie to see them here.!</Typography>
            ) : (
                <Box>
                    {!!favoritesMovies?.results?.length && <RatedCard title={'Favorite Movies'} data={favoritesMovies} />}
                    {!!watchlistMovies?.results?.length && <RatedCard title={'WatchList Movies'} data={watchlistMovies} />}
                </Box>
            )}
        </Box>
    )
}
