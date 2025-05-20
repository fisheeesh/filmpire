import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { Actors, AppLayout, MovieInformation, Movies, Profile } from '../pages/index'
import { useSelector } from 'react-redux'
import { userSelector } from '../features/auth'

export default function Router() {

    const { isAuthenticated } = useSelector(userSelector)

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
                    element: isAuthenticated ? <Profile /> : <Navigate to='/' replace />
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
