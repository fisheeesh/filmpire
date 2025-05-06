/* eslint-disable no-unused-vars */
import { useEffect } from "react"
import { Divider, List, ListItemText, ListItemIcon, Box, ListSubheader, CircularProgress, useTheme, ListItemButton } from '@mui/material'
import { Link, useSearchParams } from 'react-router-dom'
import { useGetGenresQuery } from "../services/TMDB";
import genreIcons from '../assets/genres'
import { useDispatch, useSelector } from "react-redux";
import { selectGenreOrCategory } from "../features/currentGenreOrCategory";

const redLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';
const blueLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png'

const categories = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' }
]

export default function Sidebar({ setMobileOpen }) {
    const theme = useTheme()
    const [searchParams, setSearchParams] = useSearchParams()
    const { genreIdOrCategoryName } = useSelector(state => state.currentGenreOrCategory)
    const { data, isFetching, error } = useGetGenresQuery()
    const dispatch = useDispatch()

    return (
        <>
            <Link to={'/'} style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '10% 0'
            }}>
                <img
                    src={theme.palette.mode === 'light' ? blueLogo : redLogo}
                    style={{
                        width: '70%'
                    }}
                    alt="Filmpire_logo"
                />
            </Link>
            <Divider />
            <List>
                <ListSubheader>Categories</ListSubheader>
                {
                    categories.map(({ label, value }) => (
                        <Link to={`/?category=${value}`} key={value} style={{
                            color: theme.palette.text.primary,
                            textDecoration: 'none'
                        }}>
                            <ListItemButton onClick={() => dispatch(selectGenreOrCategory(value))}>
                                <ListItemIcon>
                                    <img src={genreIcons[label.toLowerCase()]} style={{ filter: theme.palette.mode === 'light' ? 'dark' : 'invert(1)' }} height={30} alt="" />
                                </ListItemIcon>
                                <ListItemText primary={label} />
                            </ListItemButton>
                        </Link>
                    ))
                }
            </List>
            <Divider />
            <List>
                <ListSubheader>Genres</ListSubheader>
                {
                    isFetching ? (
                        <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
                            <CircularProgress size='4rem' />
                        </Box>
                    ) :
                        data?.genres.map(({ name, id }) => (
                            <Link to={`/?category=${id}`} key={name} style={{
                                color: theme.palette.text.primary,
                                textDecoration: 'none'
                            }}>
                                <ListItemButton onClick={() => dispatch(selectGenreOrCategory(id))}>
                                    <ListItemIcon>
                                        <img src={genreIcons[name.toLowerCase()]} style={{ filter: theme.palette.mode === 'light' ? 'dark' : 'invert(1)' }} height={30} alt="" />
                                    </ListItemIcon>
                                    <ListItemText primary={name} />
                                </ListItemButton>
                            </Link>
                        ))
                }
            </List>
        </>
    )
}
