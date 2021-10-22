import { useState, useEffect } from 'react';
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
  const srcToken = localStorage.getItem('token');
  const [allVisits, setAllVisits] = useState([]);
  const [inputName, setInputName] = useState('');
  const [inputDoctor, setInputDoctor] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [inputProblem, setInputProblem] = useState('');
  const history = useHistory();

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
    setInputName(e.target.value);
  }
  
  const inputDoctorHandler = (e) => {
    setInputDoctor(e.target.value);
  }
  
  const inputDateHandler = (e) => {
    setInputDate(e.target.value);
  }
  
  const inputProblemHandler = (e) => {
    setInputProblem(e.target.value);
  }

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   axios.get('http://localhost:8080/allVisits', {
  //     headers : {
  //       token: `${token}`,
  //       'Access-Control-Allow-Origin': '*',
  //       'Content-Type': 'application/json;charset=utf-8'
  //     }
  //   }).then(res => {
  //     setAllVisits(res.data.data);
  //   });
  // }, [setAllVisits]);
  
  const clickAddHandler = (e) => {
    // e.preventDefault();
    // console.log(inputName);
    // console.log(inputDoctor);
    // console.log(inputDate);
    // console.log(inputProblem);
    const token = localStorage.getItem('token');
    
    axios.post('http://localhost:8080/createVisit', {
      patient:  inputName,
      doctor:   inputDoctor,
      date:     inputDate,
      problem:  inputProblem,
      // userId:   localStorage.getItem('token')
    }, {headers : {
      token: `${token}`,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json;charset=utf-8'
    }}).then(res => {
      if (res) {
        setInputName('');
        setInputDoctor('');
        setInputDate('');
        setInputProblem('');
        setAllVisits(res.data.data);
      }
    }).catch(err => {
      if (err.response.status === 403) {
        localStorage.removeItem('token');
        history.push('/login');
      }
    });
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
              value={inputDoctor}
              select
              label="Doctor"
              type="text"
              onChange={(e) => inputDoctorHandler(e)}
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
              value={inputDate}
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
              onClick={(e) => clickAddHandler(e)}              
              disabled={!inputName || !inputDoctor || !inputDate || !inputProblem}
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
