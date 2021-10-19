import React from 'react';
import { Container, Typography, Grid } from '@material-ui/core';
import PatchLogo from './images/patch-logo';

const Header = ({ headerText }) => {

  return (
    <Grid
      className="header-page"
      container
      justifyContent="center">
      {/* <Grid item xs={2}> */}
        <PatchLogo item xs={2}/>
      {/* </Grid> */}
      <Grid className='header-text' item xs={9}>
        <Typography className='text' align='center' component="h1" variant="h5">
          {headerText}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Header;