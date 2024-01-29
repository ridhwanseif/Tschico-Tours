import React from 'react'
import UserAppBar from '../../Pages/UserAppBar/UserAppBar'
import { Layout, Space } from 'antd';



const { Sider, Content } = Layout;

export const NewService = () => {
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
                <Sider>
                    {/* <UserNavBar /> */}
                </Sider>
                <Layout>
                    <UserAppBar />
                    <Content className='scrowll'>
                        New Service
                    </Content>
                </Layout>

            </Layout>
        </div>

    </Space>
</div>
  )
}
