import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
// import UseAuth from '../component/hooks/UseAuth';
import MenuIcon from '@mui/icons-material/Menu';
import UseAuth from '../Component/hooks/UseAuth';


export const Menus = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { setAuth, auth } = UseAuth();
  const { user_id } = auth;
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    localStorage.removeItem('auth');
    setAuth({});
    navigate('/');
    handleClose();
  };

  const handleLogIn = () => {
    // localStorage.removeItem('auth');
    // setAuth({});
    navigate('/dashboard');
    handleClose();
  };

  const handleHome = () => {
    navigate('/');
    handleClose();
  }

  const handleDestination = () => {
    navigate('/destination');
    handleClose();
  }

  const handleBooking = () => {
    navigate('/booking');
    handleClose();
  }

  const handleContact = () => {
    navigate('/contact');
    handleClose();
  }


  return (
    <div>

      <MenuIcon
        onClick={handleClick}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined
        }
      />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleHome}>
          Home
        </MenuItem>
        <MenuItem onClick={handleDestination}>
          Destination
        </MenuItem>
        <MenuItem onClick={handleBooking}>
          Booking
        </MenuItem>
        <MenuItem onClick={handleContact}>
          Contact
        </MenuItem>
        {user_id ? (
          <MenuItem onClick={handleLogOut}>
            Log Out
          </MenuItem>
        ) : (
          <MenuItem onClick={handleLogIn}>
            Log In
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}