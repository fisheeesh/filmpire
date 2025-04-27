import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout, Actors, MovieInformation, Movies, Profile } from '../components/index.jsx'

export default function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <AppLayout />,
            children: [
                {
                    index: true,
                    element: <Movies />
                },
                {
                    path: '/movie/:id',
                    element: <MovieInformation />
                },
                {
                    path: '/actors/:id',
                    element: <Actors />
                },
                {
                    path: '/profile/:id',
                    element: <Profile />
                }
            ]
        }
    ])

    return (
        <RouterProvider router={router} />
    )
}
