import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Actors, AppLayout, MovieInformation, Movies, Profile } from '../pages/index'

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
                },
                {
                    path: '*',
                    element: <Movies />
                }
            ]
        }
    ])

    return (
        <RouterProvider router={router} />
    )
}
