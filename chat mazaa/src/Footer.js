import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  const today = new Date();
  return (
    <footer className='Footer'>
      <Link to='post' className='white'>SHARE NEW POST</Link>
    </footer>
  )
}

export default Footer