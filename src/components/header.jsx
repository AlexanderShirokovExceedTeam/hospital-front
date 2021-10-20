import React from 'react';
import { Typography } from '@material-ui/core';
import { Container } from '@material-ui/core';
import PatchLogo from './images/patch-logo';
import './headerStyles.scss'

const Header = ({ headerText }) => {

  return (
    <Container className="header-page">
      <PatchLogo/>
      <Container className='header-text'>
        <Typography className='text'>
          {headerText}
        </Typography>
      </Container>
    </Container>
  )
}

export default Header;
