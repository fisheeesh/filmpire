import { Outlet } from "react-router-dom";
import { Navbar } from '../index'

export default function AppLayout() {
    return (
        <main>
            <Navbar />
            <Outlet />
        </main>
    )
}
