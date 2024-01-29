import React from 'react'
import './feedback.scss';
import { Layout, Space } from 'antd';
import { allColumns, allRows } from '../../../../utils/Table/DataTable/DataTable';
import { Table } from '../../../../utils/Table/Table';



const { Sider, Content } = Layout;

export const Feedback = () => {
    return (
        <>
            <Table
                columns={allColumns}
                rows={allRows}
                tableTitle='Recived Feedback'
            />
        </>

    )
}

export default Feedback;