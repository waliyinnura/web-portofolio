import React from 'react'
import {BsTwitter, BsInstagram} from 'react-icons/bs'
// import {FaFacebook} from 'react-icons/fa'
import { BsLinkedin } from 'react-icons/bs'

const SocialMedia = () => {
  return (
    <div className='app__social'>
      <a href='https://twitter.com/joyfulasfvck' target='_blank' rel='noopener noreferrer'>
        <BsTwitter />
      </a>
      <a href='https://instagram.com/waliyinnura?igshid=NGVhN2U2NjQ0Yg==' target='_blank' rel='noopener noreferrer'>
        <BsInstagram />
      </a>
      <a href='https://www.linkedin.com/in/waliyinnura/' target='_blank' rel='noopener noreferrer'>
        <BsLinkedin />
      </a>
    </div>
  )
}

export default SocialMedia