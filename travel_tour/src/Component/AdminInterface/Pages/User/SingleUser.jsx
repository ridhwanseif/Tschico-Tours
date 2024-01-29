import React from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import UserAppBar from '../../component/Nav/UserAppBar/UserAppBar'
import UserNavBar from '../../component/Nav/UserNavBar/UserNavBar'
import { Table } from '../../utils/Table/Table';
import { allColumns, allRows } from '../../utils/Table/DataTable/DataTable';
import {
    FacebookOutlined,
    LinkedinOutlined,
    TwitterOutlined,
} from '@ant-design/icons';
import { Layout, Space, Tag } from 'antd';
import Img from './tech.jpeg'


const { Sider, Content } = Layout;

export const SingleUser = () => {
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

                                <div className='top-single'>
                                    <div className='left'>
                                        <KeyboardBackspaceIcon className='backBtn' />
                                        <h2 className='title'>
                                            Profile
                                        </h2>
                                        <div className='item'>
                                            <img
                                                src={Img}
                                                alt=''
                                                className='itemImg'
                                            />
                                            <dev className='detailsTitle'>
                                                <span>
                                                    <div className='social'>
                                                        Social Contact :
                                                    </div>
                                                </span>
                                                <Space size={[0, 8]} wrap>
                                                    <Tag icon={<TwitterOutlined />} color="#55acee">
                                                        Twitter
                                                    </Tag>
                                                    <Tag icon={<FacebookOutlined />} color="#3b5999">
                                                        Facebook
                                                    </Tag>
                                                    <Tag icon={<LinkedinOutlined />} color="#55acee">
                                                        LinkedIn
                                                    </Tag>
                                                </Space>
                                            </dev>

                                        </div>
                                    </div>
                                    <div className='right'>
                                    </div>
                                </div>

                                <div className='bootom'>
                                    <Table
                                        rows={allRows}
                                        columns={allColumns}
                                    />
                                </div>
                            </Content>
                        </Layout>

                    </Layout>
                </div>

            </Space>
        </div>
    )
}
