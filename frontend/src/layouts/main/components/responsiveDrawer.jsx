import * as React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, AppBar, Box, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton,
        ListItemIcon, ListItemText, IconButton, Button } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import config from '../../../config';
import { useSelector } from 'react-redux';
import ProfileButton from './widgets/profileButton';

const drawerWidth = 300;

function ResponsiveDrawer(props) {
  const { window, children, routes } = props;

  const navigate = useNavigate();
  const username = useSelector((state)=>state.auth.username);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function handleSidebarItemClick(item) {
    if(item.onClick) {
      item.onClick();
    } 
    if(item.route) {
      navigate(item.route);
    }
  }

  function renderSignInButton() {
    if(username) {
      return (
        <ProfileButton/>
      )
    } else {
      return (
        <Button 
          sx={{color:"white"}} 
          variant="text" 
          size="large"
          onClick={()=>navigate("/auth/signin")}
        >
          Sign In
        </Button>
      )
    }
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {routes.map((route) => (
          <ListItem key={route.key} disablePadding>
            <ListItemButton
                onClick={()=>handleSidebarItemClick(route)}
            >
              <ListItemIcon 
              >
                {route.icon}
              </ListItemIcon>
              <ListItemText primary={route.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{backgroundColor:config.brand_color_main}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <Box>

            </Box>
            {renderSignInButton()}
          </Box>
          
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
  children: PropTypes.node.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object),
};

export default ResponsiveDrawer;