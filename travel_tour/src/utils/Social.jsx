import React from 'react'
import {BsFacebook} from 'react-icons/bs';
import {BsInstagram} from 'react-icons/bs';
import {ImWhatsapp} from 'react-icons/im';
import {FaTelegramPlane} from 'react-icons/fa';
import LogIn from '../Component/AdminInterface/Authentication/LogIn/LogIn';
import DialogUtils from './DialogUtils';
import { LoginOutlined } from '@mui/icons-material';

 const Social = () => {
  return (
    <div className='social_m'>
        <a href='https://facebook.com' target='_blank'><BsFacebook /></a>
        <a href='https://instagram.com' target='_blank'><BsInstagram /></a>
        <a href='https://whatsApp.com' target='_blank'><ImWhatsapp /></a>
        <a href='https://telegram.com' target='_blank'><FaTelegramPlane /></a>

    </div>
  )
}
export default Social;
