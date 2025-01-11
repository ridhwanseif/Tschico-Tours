import React from 'react'
import { BsFacebook } from 'react-icons/bs';
import { BsInstagram } from 'react-icons/bs';
import { ImWhatsapp } from 'react-icons/im';
import { FaTelegramPlane } from 'react-icons/fa';


const Social = () => {
  return (
    <div className='social_m'>
      {/* <a href='https://facebook.com' target='_blank' rel="noreferrer"><BsFacebook /></a>
      <a href='https://instagram.com' target='_blank' rel="noreferrer"><BsInstagram /></a> */}
      <a href='https://whatsApp.com' target='_blank' rel="noreferrer"><ImWhatsapp /></a>
      {/* <a href='https://telegram.com' target='_blank' rel="noreferrer"><FaTelegramPlane /></a> */}
    </div>
  )
}
export default Social;
