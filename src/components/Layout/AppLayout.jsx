import { Outlet } from "react-router-dom";
import { Navbar } from '../index'
import useStyles from '../styles'

export default function AppLayout() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Navbar />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Outlet />
            </main>
        </div>
    )
}
