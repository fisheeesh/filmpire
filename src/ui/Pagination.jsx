import { Box, Button, Typography, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setPage } from '../features/currentGenreOrCategory'

export default function Pagination({ totalPages }) {
    const theme = useTheme()
    const dispatch = useDispatch()
    const { page } = useSelector(state => state.currentGenreOrCategory)

    const isFirstPage = page === 1
    const isLastPage = page === totalPages

    const nextPage = () => {
        dispatch(setPage(isLastPage ? page : page + 1))
    }

    const prevPage = () => {
        dispatch(setPage(isFirstPage ? page : page - 1))
    }

    if (totalPages === 0) return null

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button disabled={isFirstPage} onClick={prevPage} sx={{ margin: '30px 2px' }} variant='contained' color='primary' type='button'>Prev</Button>
            <Typography variant='h4' sx={{ margin: '0 20px !important', color: theme.palette.text.primary }}>{page}</Typography>
            <Button disabled={isLastPage} onClick={nextPage} variant='contained' color='primary' type='button'>Next</Button>
        </Box>
    )
}
