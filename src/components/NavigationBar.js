import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { useContext } from "react";
import { CustomContext } from "../context/Context";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import CapstoneIcon from '@mui/icons-material/ChangeHistory';

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const { authenticated, currentUserInfo } = useContext(CustomContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="sticky" style={{ background: '#2E3B55' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <CapstoneIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
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
            CAPSTONE
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
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem component={NavLink} to="/" key='Home' onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              {!authenticated?
              <MenuItem component={NavLink} to="/signIn" key='signIn' onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Sign In</Typography>
              </MenuItem> :null }
              {authenticated && currentUserInfo.role === 'customer' ?
                <MenuItem component={NavLink} to="/dashboard" key='dashboard' onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Dashboard</Typography>
              </MenuItem> : null}
              {authenticated && currentUserInfo.role === 'admin' ?
              <MenuItem component={NavLink} to="/admin-dashboard" key='admin' onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Admin Dashboard</Typography>
              </MenuItem> : null}
              <MenuItem component={NavLink} to="/contact" key='contact' onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Contact Us</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <CapstoneIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
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
            CAPSTONE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              key='home'
              onClick={handleCloseNavMenu}
              component={NavLink} to="/"
              sx={{ my: 2, color: 'white', display: 'block' }}
            > Home
            </Button>
            {!authenticated ?
            <Button
              key='signIn'
              onClick={handleCloseNavMenu}
              component={NavLink} to="/signIn"
              sx={{ my: 2, color: 'white', display: 'block' }}
            > Sign in
            </Button> : null}
            {authenticated && currentUserInfo.role === 'customer' ?
              <Button
                key='dashboard'
                onClick={handleCloseNavMenu}
                component={NavLink} to="/dashboard"
                sx={{ my: 2, color: 'white', display: 'block' }}
              > Dashboard
              </Button> : null}
              {authenticated && currentUserInfo.role === 'admin' ?
            <Button
              key='admin-dashboard'
              onClick={handleCloseNavMenu}
              component={NavLink} to="/admin-dashboard"
              sx={{ my: 2, color: 'white', display: 'block' }}
            > Admin Dashboard
            </Button> : null}
            <Button
              key='contact'
              onClick={handleCloseNavMenu}
              component={NavLink} to="/contact"
              sx={{ my: 2, color: 'white', display: 'block' }}
            > Contact Us
            </Button>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
