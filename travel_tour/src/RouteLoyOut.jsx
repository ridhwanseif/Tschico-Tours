import React, { useState, useEffect, useContext } from 'react'
import { Layout, Space, theme } from 'antd';
import { Link, Route, Routes } from 'react-router-dom';
import { Button } from 'rsuite';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import AuthContext from './context/AuthProvider';
import SideBar from './Component/AdminInterface/Pages/UserNavBar/SideBar';
import UserAppBar from './Component/AdminInterface/Pages/UserAppBar/UserAppBar';
import { Admin } from './Component/AdminInterface/Pages/Admin/Admin';
// import MyTest from './MyTest';
import Password from './Component/AdminInterface/Pages/Password/Password';
import Profile from './Component/AdminInterface/Pages/Profile/Profile';
import Feedback from './Component/AdminInterface/Pages/Feedback/Feedback';
import Notification from './Component/AdminInterface/Pages/Notification/Notification';
import Order from './Component/AdminInterface/Pages/order/Order';
import LandSetting from './Component/AdminInterface/Pages/Setting/LandSetting';
import MakeOrder from './Component/AdminInterface/Pages/order/MakeOrder';
import Service from './Component/AdminInterface/Pages/Service/Service';
import { NewService } from './Component/AdminInterface/Pages/Service/NewService';
import AdminDestination from './Component/AdminInterface/Pages/Destination/AdminDestination';
import AdminExcursion from './Component/AdminInterface/Pages/Excursion/AdminExcursion';
import ViewExcursion from './Component/AdminInterface/Pages/Excursion/ViewExcursion';
import ViewDestination from './Component/AdminInterface/Pages/Destination/ViewDestination';
import AdminBooking from './Component/AdminInterface/Pages/Booking/AdminBooking';
import User from './Component/AdminInterface/Pages/User/User';





const { Sider, Content } = Layout;

export const RouteLoyOut = () => {

    const [collapsed, setCollapsed] = useState(false);
    const [userRole, setUserRole] = useState('');
    const { auth } = useContext(AuthContext);
    const { role } = auth;

    // check role of logIn user
    useEffect(() => {
        setUserRole(role);
    }, [role]);


    const handDisplay = () => {
        setCollapsed(!collapsed)
    }

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (

        <div className='home'>

            <Space
                direction="vertical"
                style={{
                    width: '100%',
                }}
                size={[0, 48]}
            >
                <div className='homeContainer'>
                    <Layout>

                        <SideBar />
                        <Layout>
                            <UserAppBar
                                sidert={
                                    <Button
                                        type="text"
                                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                        onClick={handDisplay}
                                        style={{
                                            fontSize: '15px',
                                            width: 40,
                                            height: 40,
                                            marginBottom: '.6rem'
                                        }}
                                    />
                                }
                            />

                            <Content
                                className='scrowll'
                                style={{
                                    margin: '20px 10px',
                                    padding: 5,
                                    minHeight: 280,
                                    background: colorBgContainer,
                                }}
                            >
                                {/* body content*/}

                                <LoyOut />
                                {/* end of body content */}
                            </Content>
                        </Layout>
                    </Layout>
                </div>
            </Space>
        </div>
    )
}

export default RouteLoyOut;


const LoyOut = () => {

    return (
        <Routes>
            <Route path="/dashboard" element={<Admin />} />
            <Route path="/password" element={<Password />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/setting" element={<LandSetting />} />
            <Route path="/adminDestination" >
                <Route index element={<AdminDestination />} />
                <Route path='destination/:id' element={<ViewDestination />} />
            </Route>
            <Route path='adminExcursion'>
                <Route index element={<AdminExcursion />} />
                <Route path='excursion/:id' element={<ViewExcursion />} />
            </Route>
            <Route path='adminBooking'>
                <Route index element={<AdminBooking />} />
                <Route path='excursion/:id' element={<ViewExcursion />} />
            </Route>

            <Route path='users'>
              <Route index element={<User />} />
              {/* <Route path='newTechician' element={<NewTechnician />} />
              <Route path='newCustomer' element={<NewCustomer />} /> */}
              {/* <Route path='mytest' element={<MyTest />} /> */}
            </Route>

            <Route path='services'>
                <Route index element={<Service />} />
                {/* <Route path='edit/:id' element={<EditService />} /> */}
                <Route path='new' element={<NewService />} />
            </Route>

            <Route path='Order'>
                <Route path="/Order" element={<Order />} />
                <Route path='makeOrder' element={<MakeOrder />} />
                {/* <Route path='ViewOnMap/:id' element={<ViewOnMap />} />
              <Route path='ViewAllOnMap' element={<ViewAllOnMap />} /> */}
            </Route>
        </Routes>
    );
}


// params.row.role === 1 ? (
//     <span className='admin'>Admin</span>
// ) : params.row.role === 2 ? (
//     <span className='technician'>Technician</span>
// ) : params.row.role === 3 ? (
//     <span className='customer'>customer</span>
// ) : (
//     <span className='unknown'>Unknown</span>
// )
