import { AppBar, IconButton, Toolbar, useTheme, useMediaQuery, Button, Avatar, Box, } from '@mui/material';
import { AccountCircle, Brightness4, Brightness7, Menu } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const theme = useTheme();
    //? Below sm screen size isMobile will be true
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isAuthenticated = true

    return (
        <AppBar position="fixed">
            <Toolbar
                sx={{
                    height: '80px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginLeft: { xs: 0, sm: '240px' },
                    flexWrap: { xs: 'wrap', sm: 'nowrap' },
                }}
            >
                {isMobile && (
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={() => { }}
                        sx={{
                            outline: 'none',
                            mr: 2,
                            display: { sm: 'none' },
                        }}
                    >
                        <Menu />
                    </IconButton>
                )}
                <IconButton color='inherit' sx={{ ml: 1 }} onClick={() => { }}>
                    {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
                {!isMobile && 'Search...'}
                <Box>
                    {!isAuthenticated ? (
                        <Button color='inherit' onClick={() => { }}>
                            Login &nbsp; <AccountCircle />
                        </Button>
                    ) : (
                        <Button
                            color='inherit'
                            component={Link}
                            to={`/profile/:id`}
                            sx={{

                            }}
                            onClick={() => { }}
                        >
                            {!isMobile && <>My Movies &nbsp;</>}
                            <Avatar
                                sx={{ width: 30, height: 30 }}
                                alt='profile'
                                src="data:image/png;base64,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"
                            />
                        </Button>
                    )}
                </Box>
                {isMobile && 'Search...'}
            </Toolbar>
        </AppBar>
    );
}