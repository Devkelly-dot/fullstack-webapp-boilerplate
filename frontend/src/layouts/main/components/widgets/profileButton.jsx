import * as React from 'react';
import { Button, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList, Stack } from '@mui/material';
import config from '../../../../config';
import { useNavigate } from 'react-router-dom';
import dispatchLogout from '../../../../ufils/auth/dispatchLogout';
import { useDispatch, useSelector } from 'react-redux';
import EditProfileModal from '../../../../components/editProfileModal/editProfileModal';

function ProfileButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state)=>state.auth.username)

  const [profileModalOpen, setProfileModalOpen] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  function handleLogout() {
    dispatchLogout(dispatch);
    navigate('/auth/signin');
  }

  function handleOpenProfileModal() {
    setOpen(false);
    setProfileModalOpen(true);
  }

  return (
    <Stack direction="row" spacing={2}>
      {
        profileModalOpen && 
        <EditProfileModal
          open={profileModalOpen}
          onClose={()=>setProfileModalOpen(false)}
        />
      }
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          sx={{color: config.brand_text_color_secondary}}
        >
          {username}
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    <MenuItem onClick={handleOpenProfileModal}>User Profile</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}

export default ProfileButton;