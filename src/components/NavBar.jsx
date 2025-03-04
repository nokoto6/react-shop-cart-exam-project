import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import StoreIcon from '@mui/icons-material/Store';
import { Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router";
import { useLocalStorage } from 'react-use';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { CartCountContext } from '../contexts/CartCountContext'

function NavBar(props) {
    const pages = props.pages;
    const [cart, setCart] = useLocalStorage('cart', {});
    const cartContext = useContext(CartCountContext);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        setCartCount(Object.keys(cart).length)
    }, [cart])

    useEffect(() => {
        setCartCount(cartContext.cartCount)
    }, [cartContext])

    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
    <AppBar position="static">
        <Container maxWidth="xl">
        <Toolbar disableGutters>
            <StoreIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            onClick={(e) => {e.preventDefault(); navigate("/")}}
            sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
            }}
            >
                Shop
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
            >
                {pages.map((page) => (
                <MenuItem key={page.title} onClick={() => { handleCloseNavMenu(); navigate(page.src)}}>
                    <Typography sx={{ textAlign: 'center' }}>{page.title}</Typography>
                </MenuItem>
                ))}
            </Menu>
            </Box>
            <StoreIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            onClick={(e) => {e.preventDefault(); navigate("/")}}
            sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
            }}
            >
                Shop
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
                <Button
                key={page.title}
                onClick={() => { navigate(page.src)}}
                sx={{ my: 2, color: 'white', display: 'block' }}
                >
                {page.title}
                </Button>
            ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open cart">
                <IconButton onClick={() => navigate("/cart")} sx={{ p: 1 }}>
                    <Badge badgeContent={cartCount} color="error">
                        <ShoppingCartIcon sx={{ display: { md: 'flex' }, mr: 1 }}></ShoppingCartIcon>
                    </Badge>
                </IconButton>
            </Tooltip>
            </Box>
        </Toolbar>
        </Container>
    </AppBar>
    );
}
export default NavBar;