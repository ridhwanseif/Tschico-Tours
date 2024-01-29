import React from 'react'
import './Wedget.scss'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';



export const Wedget = ({ title, counter, link, percentage, icon }) => {
    return (
        <div className='widget'>
            <div className='right'>
                <div className='title'>{title}</div>
                <div className='counter'>{counter}</div>
                <span className='link'>{link}</span>
            </div>
            <div className='left'>
                <div className='percentage'>
                    <ExpandLessIcon className='upicon'/> {percentage} %
                </div>
                {icon}
            </div>
        </div>
    )
}
