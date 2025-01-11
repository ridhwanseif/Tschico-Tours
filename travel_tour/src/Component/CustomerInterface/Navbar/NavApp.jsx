import React, { useState, useEffect } from 'react';
import './NavApp.css';
import 'rsuite/dist/rsuite.css';
import { Navbar, Nav } from 'rsuite';
import { Menus } from '../../../utils/Menus';
import Img1 from '../../../theZanzibarTaxi.png';
import { Link, useLocation } from 'react-router-dom';
import { LoginOutlined } from '@mui/icons-material';
import DialogUtils from '../../../utils/DialogUtils';
import LogIn from '../../AdminInterface/Authentication/LogIn/LogIn';

const NavApp = () => {
  const [navStyle, setNavStyle] = useState(false);
  const location = useLocation();

  // Handle scroll event for navbar style
  useEffect(() => {
    const changeNav = () => {
      setNavStyle(window.scrollY >= 1);
    };

    window.addEventListener('scroll', changeNav);
    return () => {
      window.removeEventListener('scroll', changeNav);
    };
  }, []);

  // Check if a route is active
  const isActive = (path) => location.pathname === path;

  return (
    <Navbar appearance={navStyle ? 'default' : 'subtle'} className="header-nav">
      <Nav>
        <Nav.Item style={{ width: '22rem', height: '3rem' }} className="nav-item i-img">
          <img
            src={Img1}
            alt="Logo"
            style={{ width: '2.7rem', height: '2.7rem', marginLeft: '1rem', marginRight: '1rem' }}
          />
          <h5 style={{ color: '#ff5722' }}>Tschico Tours</h5>
        </Nav.Item>
      </Nav>
      <Nav pullRight>
        <Nav.Item className={`nav-item i-link ${isActive('/') ? 'active' : ''}`}>
          <Link to="/" className="nav-text link">
            Home
          </Link>
        </Nav.Item>
        <Nav.Item className={`nav-item i-link ${isActive('/destination') ? 'active' : ''}`}>
          <Link to="/destination" className="nav-text link">
            Transfers
          </Link>
        </Nav.Item>
        <Nav.Item className={`nav-item i-link ${isActive('/excursion') ? 'active' : ''}`}>
          <Link to="/excursion" className="nav-text link">
            Excursions
          </Link>
        </Nav.Item>
        <Nav.Item className={`nav-item i-link ${isActive('/booking') ? 'active' : ''}`}>
          <Link to="/booking" className="nav-text link">
            Booking
          </Link>
        </Nav.Item>
        <Nav.Item className={`nav-item i-link ${isActive('/contact') ? 'active' : ''}`}>
          <Link to="/contact" className="nav-text link">
            Contact
          </Link>
        </Nav.Item>
        <Nav.Item className="nav-item i-link login-item">
          <DialogUtils
            buttonIcon={<LoginOutlined />}
            buttonAppearance="link"
            dialogTitle="Login"
            dialogContentBody={<h4>Login Content Goes Here</h4>}
            dialogActionLabel2="Cancel"
            dialogContactBody={<LogIn />}
          />
        </Nav.Item>
        <Nav.Item className="nav-item menu">
          <Menus />
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default NavApp;
