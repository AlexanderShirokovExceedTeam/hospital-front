import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import {
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Container
} from '@material-ui/core';
import './inputBlockStyles.scss'

const InputBlock = ({ headerText }) => {

  return (
    <Container className="input-block">
      <Container className='input-name'>
        <Typography className='text'>
          {headerText}
        </Typography>
      </Container>

      <Container className='input-doctor'>

      </Container>

      <Container className='input-date'>

      </Container>

      <Container className='input-problem'>

      </Container>
    </Container>
  )
}

export default InputBlock;
