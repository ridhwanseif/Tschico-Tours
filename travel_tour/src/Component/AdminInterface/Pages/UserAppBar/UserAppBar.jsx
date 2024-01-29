import React, { useEffect, useState } from 'react'
import './UserAppBar.scss'
import { ChatBubbleOutlineOutlined, DarkModeOutlined, LanguageOutlined, NotificationsNoneOutlined } from '@mui/icons-material';
import SearchIcon from '@rsuite/icons/Search';
import { Input, InputGroup } from 'rsuite';
import { Badge } from 'rsuite';
import { Menus } from '../../../../utils/Menus';
import { fetchNotification } from '../../../../api/NotificationAPI';
import { useQuery } from 'react-query';


const UserAppBar = ({ sidert }) => {

  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    const handleMediaQueryChange = (event) => {
      setIsVisible(!event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  // Fetch sidebar content using React Query
  const { data: sidebarData, isLoading, isError } = useQuery('sidebarContent', fetchNotification);
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    // Update itemCount when sidebarData changes and notificationStatus is 'unreceived'
    if (sidebarData && sidebarData.notificationStatus === 'unreceived') {
      setItemCount(sidebarData.length || 0);
    } else {
      // Reset itemCount if notificationStatus is not 'unreceived' or not defined
      setItemCount(0);
    }
  }, [sidebarData]);
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading sidebar content</div>;

  console.log("testF:", sidebarData)

  // Calculate the count of sidebar items


  const styles = {
    width: 300,
    marginBottom: 10
  };

  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div>
          {sidert}
        </div>
        {isVisible &&
          <div className='search'>
            <InputGroup style={styles}>
              <Input placeholder='Search...' />
              <InputGroup.Addon>
                <SearchIcon />
              </InputGroup.Addon>
            </InputGroup>
          </div>
        }
        <div className='items'>
          <div className='item'>
            <LanguageOutlined className='icon' />
            English
          </div>
          {isVisible &&
            <div className='item'>
              <DarkModeOutlined className='icon' />
            </div>
          }
          <div className='item'>
            <Badge content={itemCount}>
              <NotificationsNoneOutlined className='icon' />
            </Badge>
          </div>
          <div className='item'>
            <Badge content={itemCount}>
              <ChatBubbleOutlineOutlined className='icon' />
            </Badge>
          </div>
          {isVisible &&
            <div className='menu'>
              <Menus />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default UserAppBar