import { useState } from 'react';
import {
  TextField,
  Box,
  Container,
} from '@material-ui/core';
import './sortCollection.scss';

const SortCollection = ({ allVisits, setAllVisits }) => {
  const [inputDirection, setInputDirection] = useState('Ascending');
  const [inputProperty, setInputProperty] = useState('');
  const property = [
    {
      label: '',
      value: '',
    },
    {
      label: 'Patient',
      value: 'patient',
    },
    {
      label: 'Doctor',
      value: 'doctor',
    },
    {
      label: 'Date',
      value: 'date'
    },
  ];

  const direction = [
    {
      value: 'Ascending',
    },
    {
      value: 'Descending',
    },
  ];

  const sortCollection = (sortByProperty, sortDirection) => {
    allVisits = allVisits.sort((a, b) => a[sortByProperty] > b[sortByProperty] ? 1 : -1);
    if (sortDirection === 'Descending') allVisits = allVisits.reverse();
    setAllVisits([...allVisits]);
  }

  const inputPropertyHandler = (e) => {
    const value = e.target.value || '_id';
    setInputProperty(value);
    setInputDirection('Ascending');
    sortCollection(value, inputDirection);
  }

  const inputDirectionHandler = (e) => {
    const direction = e.target.value;
    setInputDirection(direction);
    sortCollection(inputProperty, direction);
  }

  return (
    <>
      <Container className="sort-block">
        <Box className="input-property">
          <TextField
            className="propertyField"
            name="inputProperty"
            variant="outlined"
            fullWidth
            id="inputProperty"
            value={inputProperty}
            select
            label="Sort by property"
            onChange={(e) => inputPropertyHandler(e)}
            SelectProps={{
              native: true,
            }}
          >
            {
              property.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))
            }
          </TextField>
        </Box>
        {
          inputProperty && inputProperty !== '_id' &&
          <Box className="input-direction">          
            <TextField
              className="directionField"
              name="inputDirection"
              variant="outlined"
              required
              fullWidth
              id="inputDirection"
              value={inputDirection}
              select
              label="Sort direction"
              type="text"
              onChange={(e) => inputDirectionHandler(e)}
              SelectProps={{
                native: true,
              }}
            >
              {
                direction.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.value}
                  </option>
                ))
              }
            </TextField> 
          </Box>
        }
      </Container>
    </>
  )
}

export default SortCollection;
