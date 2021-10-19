import React from 'react';
import { Typography } from '@material-ui/core';
// import { Container } from '@material-ui/core';
import PatchLogo from './images/patch-logo';
import './headerStyles.css'

const Header = ({ headerText }) => {

  return (
    <div className="header-page">
        <PatchLogo/>
      <div className='header-text'>
        <Typography className='text'>
          {headerText}
        </Typography>
      </div>
    </div>
  )
}

export default Header;