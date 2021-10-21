import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import {
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  Select
} from '@material-ui/core';
import './inputBlockStyles.scss'

const InputBlock = () => {
  const [doctorSelect, setDoctorSelect] = useState();

  const doctors = [
    {
      value: '',
    },
    {
      value: 'Jonathan Sins',
    },
    {
      value: 'Gregory House',

    },
    {
      value: 'Emmett Brown',
    },
    {
      value: 'Rick Sanchez',
    },
  ];

  const inputNameHandler = (e) => {

  }

  const inputDoctorHandler = (e) => {
    
  }

  const inputDateHandler = (e) => {
    
  }

  const inputProblemHandler = (e) => {
    
  }

  return (
    <Container className="input-block" component="div" maxWidth="xs">
      <form className="input-form" fullWidth>
        <Grid container spacing={2}>
          <Grid
            className='input-name'
            item
            xs={3}
          >
            <TextField
              className="nameField"
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

          <Grid
            className='input-doctor'
            item
            xs={3}
          >
            <TextField
              className="doctorField"
              name="inputDoctor"
              variant="outlined"
              required
              fullWidth
              id="inputDoctor"
              value={doctorSelect}
              // id="outlined-select-currency-native"
              select
              label="Doctor"
              type="text"
              onChange={(e) => setDoctorSelect(e.target.value)}
              SelectProps={{
                native: true,
              }}
            >
              {
                doctors.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.value}
                  </option>
                ))
              }
            </TextField>
          </Grid>

          <Grid
            className='input-date'
            item
            xs={2}
          >
            <TextField
              name="inputDate"
              onChange={(e) => inputDateHandler(e)}
              className="dateField"
              id="inputDate"
              type="date"
              variant="outlined"
              value={''}
              autoComplete='off'
              required
              fullWidth
            />
          </Grid>
          
          <Grid
            className='input-problem'
            item
            xs={3}
          >
            <TextField
              className="problemField"
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
          <Grid
            className="input-button"
            item
            xs={1}
            // alignItems="center"
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default InputBlock;
