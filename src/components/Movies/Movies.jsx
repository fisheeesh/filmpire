import React from 'react'
import { useGetMoviesQuery } from '../../services/TMDB'

export default function Movies() {
    const res = useGetMoviesQuery()
    console.log(res)

    return (
        <div>
            movies
        </div>
    )
}
