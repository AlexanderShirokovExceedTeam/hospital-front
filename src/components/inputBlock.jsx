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

const InputBlock = () => {

  const inputNameHandler = (e) => {

  }

  const inputDoctorHandler = (e) => {
    
  }

  const inputDateHandler = (e) => {
    
  }

  const inputProblemHandler = (e) => {
    
  }

  return (
    <Container className="input-block">
      <form className="input-form">        
        <Grid className='input-name'>
          {/* <Typography className='text'>
            Name
          </Typography> */}
          <TextField
            name="inputName"
            variant="outlined"
            required
            fullWidth
            id="inputName"
            label="Name"
            type="text"
            onChange={(e) => inputNameHandler(e)}
          />
        </Grid>

        <Grid className='input-doctor'>
          {/* <Typography className='text'>
            Doctor
          </Typography> */}
          <TextField
            name="inputDoctor"
            variant="outlined"
            required
            fullWidth
            id="inputDoctor"
            label="Doctor"
            type="text"
            onChange={(e) => inputDoctorHandler(e)}
          />
        </Grid>

        <Grid className='input-date'>
          {/* <Typography className='text'>
            Date
          </Typography> */}
          <TextField
            name="inputDate"
            variant="outlined"
            required
            fullWidth
            id="inputDate"
            label="Date"
            type="date"
            onChange={(e) => inputDateHandler(e)}
          />
        </Grid>
        
        <Grid className='input-problem'>
          {/* <Typography className='text'>
            Problem
          </Typography> */}
          <TextField
            name="inputProblem"
            variant="outlined"
            required
            fullWidth
            id="inputProblem"
            label="Problem"
            type="text"
            onChange={(e) => inputProblemHandler(e)}
          />
        </Grid>
      </form>
    </Container>
  )
}

export default InputBlock;
