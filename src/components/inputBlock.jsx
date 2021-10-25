import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import {
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Select,
  Hidden
} from '@material-ui/core';
import './inputBlockStyles.scss'

const InputBlock = () => {
  const srcToken = localStorage.getItem('token');
  const [allVisits, setAllVisits] = useState([]);
  const [inputName, setInputName] = useState('');
  const [inputDoctor, setInputDoctor] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [inputProblem, setInputProblem] = useState('');
  const [isHidden, setIsHidden] = useState(false);
  const history = useHistory();
  
  // useEffect(() => {
  //   console.log(window.innerWidth);
  // });

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
  
  const clickAddHandler = (e) => {
    const token = localStorage.getItem('token');
    
    axios.post('http://localhost:8080/createVisit', {
      patient:  inputName,
      doctor:   inputDoctor,
      date:     inputDate,
      problem:  inputProblem,
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

  // const buttonHideHandler = () => {
  //   console.log(isHidden);
  // }
  
  return (
    // on ipad hidden inputs  hidden ? 'hide' : ''
    <Container className="input-block">
      {
        ((isHidden && (window.innerWidth <= 768)) ||
        window.innerWidth > 768) &&
        <form className="input-form" id="input-form">
            <Box className="input-name">
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
            </Box>
            <Box className='input-doctor'>
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
            </Box>
            <Box className='input-date'>
              <TextField
                  className="dateField"
                  name="inputDate"
                  onChange={(e) => inputDateHandler(e)}
                  id="inputDate"
                  type="date"
                  variant="outlined"
                  value={inputDate}
                  autoComplete='off'
                  required
                  fullWidth
                />
            </Box>
            <Box className='input-problem'>
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
            </Box>
            <Box className="input-button">
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
            </Box>
        </form>
      }      
      {
        window.innerWidth <= 768 &&
        !isHidden &&
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={!isHidden ? '' : 'hide-button'}
          onClick={() => setIsHidden(true)}
        >
          Fill inputs
        </Button>
      }
    </Container>
  )
}

export default InputBlock;
