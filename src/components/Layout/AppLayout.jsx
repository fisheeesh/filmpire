import { Outlet } from "react-router-dom";
import { Navbar } from '../index';
import { Box } from '@mui/material';

export default function AppLayout() {
    return (
        <Box sx={{ display: 'flex', height: '100%' }}>
            <Navbar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: '2em',
                }}
            >
                <Box sx={{ height: '70px' }} />
                <Outlet />
            </Box>
        </Box>
    );
}