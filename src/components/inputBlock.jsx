import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import {
  Button,
  TextField,
  Box,
  Container,
} from '@material-ui/core';
import './inputBlockStyles.scss';

const InputBlock = ({ setAllVisits }) => {
  const [inputName, setInputName] = useState('');
  const [inputDoctor, setInputDoctor] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [inputProblem, setInputProblem] = useState('');
  const [isHidden, setIsHidden] = useState(false);
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
  
  const clickAddHandler = () => {
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

  const inputButtonIsValid = !inputName || !inputDoctor || !inputDate || !inputProblem;
  
  return (
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
                  onClick={() => clickAddHandler()}              
                  disabled={inputButtonIsValid}
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
          onClick={() => setIsHidden(true)}
        >
          Fill inputs
        </Button>
      }
    </Container>
  )
}

export default InputBlock;
