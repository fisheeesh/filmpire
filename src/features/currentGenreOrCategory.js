import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    genreIdOrCategoryName: 'popular',
    prev: '',
    page: 1,
    searchQuery: ''
}

export const genreOrCategory = createSlice({
    name: 'genreOrCategory',
    initialState,
    reducers: {
        selectGenreOrCategory: (state, action) => {
            state.genreIdOrCategoryName = action.payload
            state.searchQuery = ''
        },
        setPrev: (state, action) => {
            state.prev = action.payload
        },
        searchMovie: (state, action) => {
            state.searchQuery = action.payload
        },
        setPage: (state, action) => {
            state.page = action.payload
        }
    }
})

export const { selectGenreOrCategory, setPrev, searchMovie, setPage } = genreOrCategory.actions

export default genreOrCategory.reducer