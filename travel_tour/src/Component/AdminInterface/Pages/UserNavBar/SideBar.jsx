import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { NavLink, Link, useNavigate, Routes, Route } from 'react-router-dom';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import LowPriorityRoundedIcon from '@mui/icons-material/LowPriorityRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import EnhancedEncryptionRoundedIcon from '@mui/icons-material/EnhancedEncryptionRounded';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import FeedbackIcon from '@mui/icons-material/Feedback';
import AuthContext from '../../../../context/AuthProvider';
import axios from '../../../../api/axios';
import { useQuery } from 'react-query';
import { fetchBooking } from '../../../../api/BookingAPI';


const { Sider } = Layout;


const SideBar = () => {

  const [countInco, setCountInco] = useState(0);

  // // Fetch
  // const { data: booking, isLoading, isError } = useQuery('booking', fetchBooking);

  //   // Check if booking is defined and its status is 'incomplete'
  //   if (booking?.status === 'incomplete') {
  //     // Increment the count
  //     setCountInco(prevCount => prevCount + 1);
  //   }

  
  // console.log('this is count incomplite:', booking?.status )


  const [collapsed, setCollapsed] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  const [userById, setUsersById] = useState([]);
  const { auth, setAuth } = useContext(AuthContext);
  const { role, user_id } = auth;
  useEffect(() => {
    setUserRole(role);
    fetchData();
  }, [role]);

  const fetchData = async () => {
    try {
      const user = `user/detail/${user_id}/`;
      const response = await axios.get(user);

      setUsersById(response.data)
      console.log('user data:', response.data);

    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setAuth({});
    navigate('/');
  };

  const [lastActiveMenuItem, setLastActiveMenuItem] = useState({
    key: '/dashboard',
    timestamp: Date.now()
  });

  const updateLastActiveMenuItem = (key) => {
    setLastActiveMenuItem({
      key,
      timestamp: Date.now()
    });
  };

  useEffect(() => {
    const checkLastActiveMenuItem = setInterval(() => {
      const { key, timestamp } = lastActiveMenuItem;

      // 30 minutes = 1800000 milliseconds
      if (key && Date.now() - timestamp > 18000000) {
        localStorage.removeItem('auth');
        setAuth({});
        navigate('/login');
      }
    }, 10000);

    return () => clearInterval(checkLastActiveMenuItem);
  }, [lastActiveMenuItem, navigate, setAuth]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 992px)');

    const handleMediaQueryChange = (event) => {
      setCollapsed(event.matches);
    };

    mediaQuery.addListener(handleMediaQueryChange);
    setCollapsed(mediaQuery.matches);

    return () => mediaQuery.removeListener(handleMediaQueryChange);
  }, []);

  const menuItem = [
    {
      key: '/auth/dashboard',
      icon: <DashboardRoundedIcon />,
      label: 'Dashboard',
    },
    {
      key: '/auth/Users',
      icon: <UserOutlined />,
      label: 'Users',
    },
    {
      key: '/auth/Setting',
      icon: <LowPriorityRoundedIcon />,
      label: 'land Setting',
      // hidden: userRole !== 'admin',
    },
    {
      key: '/auth/adminDestination',
      icon: <SupportAgentRoundedIcon />,
      label: 'Destinations',
    },
    {
      key: '/auth/adminExcursion',
      icon: <LowPriorityRoundedIcon />,
      label: 'Excusions',
      // hidden: userRole !== 'admin',
    },
    {
      key: '/auth/adminBooking',
      icon: <LowPriorityRoundedIcon />,
      label: 'Booking',
      // hidden: userRole !== 'admin',
    },
    {
      key: '/auth/notification',
      icon: <NotificationsNoneIcon />,
      label: 'Notification',
    },

    {
      key: '/auth/profile',
      icon: <AccountCircleRoundedIcon />,
      label: 'Profiles',
    },
    {
      key: '/auth/password',
      icon: <EnhancedEncryptionRoundedIcon />,
      label: 'Password',
    },
    {
      key: 'Log_Out',
      icon: <LogoutRoundedIcon />,
      label: 'Log Out',
      danger: true,
    },
  ];

  return (
    <Sider
      style={{ height: '100vh' }}
      collapsible
      collapsed={collapsed}
      onCollapse={value => setCollapsed(value)}
    >
      {collapsed ? (
        <div
          className="top"
          style={{
            margin: '.8rem 0 0 1rem',
            borderRadius: '50%',
            width: '3rem',
            height: '3rem',
          }}
        >
          <img className='userImg'
            style={{
              borderRadius: '50%',
              width: '3rem',
              height: '3rem',
            }}
            src={userById.photo} alt="img_error"
          />
        </div>
      ) : (
        <div
          className="top"
          style={{
            margin: '.8rem 0 0 2.4rem',
            borderRadius: '50%',
            width: '8rem',
            height: '8rem',
          }}
        >
          <img className='userImg'
            style={{
              borderRadius: '50%',
              width: '8rem',
              height: '8rem',
            }}
            src={userById.photo} alt="img_error"
          />
        </div>
      )}
      <hr style={{ color: '#fff', marginBottom: '0.2rem' }} />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['0']}
        onClick={({ key }) => {
          if (key === 'Log_Out') {
            handleLogout();
          } else {
            navigate(key);
            updateLastActiveMenuItem(key);
          }
        }}
      >
        {menuItem.map(item => (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            hidden={item.hidden}
            danger={item.danger}
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default SideBar;
