import React from 'react';
import { Typography } from '@material-ui/core';
import { Container, Grid, Box } from '@material-ui/core';
import PatchLogo from './images/patch-logo';
import './headerStyles.css'

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