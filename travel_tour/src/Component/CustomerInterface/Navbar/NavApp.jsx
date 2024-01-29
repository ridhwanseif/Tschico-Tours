import React, { useState, useEffect } from 'react';
import './NavApp.css';
import 'rsuite/dist/rsuite.css';
import { Navbar, Nav } from 'rsuite';
import { Menus } from '../../../utils/Menus';
import Img1 from '../../../theZanzibarTaxi.png';
import { Link } from 'react-router-dom';
import Home from '../Home/Home';
import Booking from '../booking/Booking';
import Contact from '../contact/Contact';
import Destination from '../destination/zanzibarNorth';
import { LoginOutlined } from '@mui/icons-material';
import LogIn from '../../AdminInterface/Authentication/LogIn/LogIn';
import DialogUtils from '../../../utils/DialogUtils';

const NavApp = () => {
  const [selectedNavItem, setSelectedNavItem] = useState('');

  // change nav
  const [navStyle, setNavStyle] = useState(false);
  const changeNav = () => {
    if (window.scrollY >= 1) {
      setNavStyle(true)
    }
    else {
      setNavStyle(false)
    }
  }
  window.addEventListener('scroll', changeNav);

  return (
    <>
      <Navbar
        appearance={navStyle ? "default" : "subtle"}
        className='header-nav'>
        <Nav>
          <Nav.Item
            style={{
              width: '22rem',
              height: '3rem',
            }}
            className='nav-item'
          >
            <img
              src={Img1}
              alt="My Image"
              style={{
                width: '2.7rem',
                height: '2.7rem',
                marginLeft: '1rem',
                marginRight: '1rem'
              }}
            />
            <h5
              style={{
                color: "#ff5722"
              }}> Tschico Tours </h5>
          </Nav.Item>
        </Nav>
        <Nav pullRight>
          <Nav.Item
            className={`nav-item link ${selectedNavItem === 'home' ? 'active' : ''}`}
            href='#homeId'
            // icon={<HomeIcon />}
            onClick={() => setSelectedNavItem('home')}
          >
            <Link style={{ textDecoration: 'none' }} to='/' element={Home} className={`nav-text link ${selectedNavItem === 'home' ? 'active' : ''}`}>
              Home
            </Link>
          </Nav.Item>
          <Nav.Item
            className={`nav-item link ${selectedNavItem === 'Destination' ? 'active' : ''}`}
            href='#destinationId'
            // icon={<ElectricalServicesIcon />}
            onClick={() => setSelectedNavItem('Destination')}
          >
            <Link style={{ textDecoration: 'none' }} to='/destination' element={Destination} className={`nav-text link ${selectedNavItem === 'Destination' ? 'active' : ''}`}>
              Destination
            </Link>
          </Nav.Item>
          <Nav.Item
            className={`nav-item link ${selectedNavItem === 'Booking' ? 'active' : ''}`}
            href='#bookingId'
            // icon={<ElectricalServicesIcon />}
            onClick={() => setSelectedNavItem('Booking')}
          >
            <Link style={{ textDecoration: 'none' }} to='/booking' element={Booking} className={`nav-text link ${selectedNavItem === 'Booking' ? 'active' : ''}`}>
              Booking
            </Link>
          </Nav.Item>

          <Nav.Item
            className={`nav-item link ${selectedNavItem === 'contact' ? 'active' : ''}`}
            // href='#contactId'
            // icon={<PermContactCalendarRoundedIcon />}
            onClick={() => setSelectedNavItem('contact')}
          >
            <Link style={{ textDecoration: 'none' }} to='/contact' element={Contact} className={`nav-text link ${selectedNavItem === 'contact' ? 'active' : ''}`}>
              Contact
            </Link>
          </Nav.Item>

          <Nav.Item
            className={`nav-item link ${selectedNavItem === 'Tours' ? 'active' : ''}`}
            href='#toursId'
            // icon={<ElectricalServicesIcon />}
            onClick={() => setSelectedNavItem('Tours')}
          >
            <DialogUtils
              buttonIcon={<LoginOutlined />}
              buttonApppearance={'link'}
              dialodTilte={'DialogTilte'}
              dialogContactBody={<LogIn />}
              dialogContact={'DialogContact'}
              dialogActionLaleb2={'Cancel'}
            />
          </Nav.Item>
          <Nav.Item className='nav-item menu'>
            <Menus />
          </Nav.Item>
        </Nav>
      </Navbar>
    </>
  );
};

export default NavApp;

// import React, { useState } from 'react'
// import { FaBars, FaTimes } from 'react-icons/fa'
// import Img1 from '../../../theZanzibarTaxi.png';

// // import logo from './images/logo.png'
// import './NavApp.css';

// // import './Navbar.css'

// const Navbar = () => {

//   const [click, setClick] = useState(false)
//   const handleClick = () => setClick(!click)

//   const closeMenu = () => setClick(false)

//   return (
//     <section className="bg-gradient-white">
//       <div className="container">


//         <div className='header'>
//           <nav className='navbar'>
//             <a href='/' className='logo'>
//             <img
//                 src={Img1}
//                 alt="My Image"
//                 style={{
//                   width: '2.7rem',
//                   height: '2.7rem',
//                   marginBotton: '2rem'
//                 }}
//               />
//             </a>
//             <div className='hamburger' onClick={handleClick}>
//               {click ? (<FaTimes size={30} style={{ color: 'black' }} />)
//                 : (<FaBars size={30} style={{ color: 'black' }} />)}

//             </div>
//             <ul className={click ? "nav-menu active" : "nav-menu"}>
//               <li className='nav-item'>
//                 <a href='/' onClick={closeMenu}>Home</a>
//               </li>
//               <li className='nav-item'>
//                 <a href='#about' onClick={closeMenu}>About</a>
//               </li>
//               <li className='nav-item'>
//                 <a href='#testimonials' onClick={closeMenu}>Testimonials</a>
//               </li>
//               <li className='nav-item'>
//                 <a href='#demo' onClick={closeMenu}>Demo</a>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Navbar