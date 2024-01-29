import React from 'react'
import UserAppBar from '../../component/Nav/UserAppBar/UserAppBar'
import UserNavBar from '../../component/Nav/UserNavBar/UserNavBar'
import { Layout, Space } from 'antd';


const { Sider, Content } = Layout;
export const NewUser = () => {
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
                    <UserNavBar />
                </Sider>
                <Layout>
                    <UserAppBar />
                    <Content className='scrowll'>
                       New User
                    </Content>
                </Layout>

            </Layout>
        </div>

    </Space>
</div>
  )
}
