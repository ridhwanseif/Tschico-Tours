import React, { useEffect } from 'react'
import { Wedget } from '../../../../utils/Wedget/Wedget';
import './admin.scss';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import LowPriorityRoundedIcon from '@mui/icons-material/LowPriorityRounded';
import { Chart } from '../../../../utils/Chart/Chart';
import axios from '../../../../api/axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Panel } from 'rsuite';
  
  
  export const Admin = () =>  {
    const navigate = useNavigate()
 
  const [userCount, setUserCount] = useState();
  const [userParcent, setUserParcent] = useState();

  const [serviceCount, setServiceCount] = useState();
  const [serviceParcent, setServiceParcent] = useState();

  const [orderCount, setOrderCount] = useState();
  const [orderParcent, setOrderParcent] = useState();

  const [feedBackCount, setFeedBackCount] = useState();
  const [feedBackParcent, setFeedBackParcent] = useState();
  
// service
  useEffect(() => {
    fetchUserData();
    fetchServiceData();
    fetchOrdereData();
  }, []);

  const fetchUserData = async () => {
      try {
          const response = await axios.get('users/')

           // Count the number of elements in the response data
           const dataCount = response.data.length;
           console.log('Data Count:', dataCount);
           setUserCount(response.data.length);

           // Calculate the percentage
            const totalCount = 500; 
            const userPercentage = ((dataCount / totalCount) * 100).toFixed(2);
            console.log('Percentage:', userPercentage);

          setUserParcent(userPercentage)

      } catch (error) {
          console.log('Error fetching data:', error);
      }
  };
  // end of user data

// service
const fetchServiceData = async () => {
    try {
        const response = await axios.get('services/')

         // Count the number of elements in the response data
         const dataCount = response.data.length;
         setServiceCount(response.data.length);

         // Calculate the percentage
          const totalCount = 500;
          const servicePercentage = ((dataCount / totalCount) * 100).toFixed(2);

        setServiceParcent(servicePercentage)

    } catch (error) {
        console.log('Error fetching data:', error);
    }
};
// end of user data

// service
const fetchOrdereData = async () => {
  try {
      const response = await axios.get('order-service/')

       // Count the number of elements in the response data
       const dataCount = response.data.length;
       setOrderCount(response.data.length);

       // Calculate the percentage
        const totalCount = 500;
        const servicePercentage = ((dataCount / totalCount) * 100).toFixed(2);

        setOrderParcent(servicePercentage)

  } catch (error) {
      console.log('Error fetching data:', error);
  }
};
// end of user data
  
    return (
  
              <>
              {/* body content*/}
  
                <Panel
                style={{
                  marginRight: '1rem'
                }}>
                <div className='row py-3'>
                <div className='col-md-3 py-2'>
                  <Wedget
                    title="USERS"
                    counter={userCount}
                    link="see all user"
                    percentage={userParcent}
                    icon={<PersonRoundedIcon className='icon' />}
                  />
                </div>
                <div className='col-md-3 py-2'>
                  <Wedget
                    title="DESTINATION"
                    counter={serviceCount}
                    link="see all destination"
                    percentage={serviceParcent}
                    icon={<SupportAgentRoundedIcon className='icon' />}
                  />
                </div>
                <div className='col-md-3 py-2'>
                  <Wedget
                    title="EXCURSION"
                    counter={orderCount}
                    link="see all excursion"
                    percentage={orderParcent}
                    icon={<LowPriorityRoundedIcon className='icon' />}
                  />
                  </div>
                <div className='col-md-3 py-2'>
                  <Wedget
                    title="BOOKING"
                    counter={feedBackCount}
                    link="see all booking"
                    percentage={feedBackParcent}
                    icon={<PersonRoundedIcon className='icon' />}
                  />
                  </div>
                </div>
                </Panel>
                <div className='charts'>
                  <Chart />
                </div>
  
                {/* end of body content */}
              </>
          
    );
  };
//   export default Admin;
  
  
