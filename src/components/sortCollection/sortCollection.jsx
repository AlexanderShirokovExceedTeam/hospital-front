import { useState } from 'react';
import {
  // Button,
  TextField,
  Box,
  Container,
} from '@material-ui/core';
import './sortCollection.scss'

const SortCollection = () => {
  const [inputDirection, setInputDirection] = useState('');
  const [inputProperty, setInputProperty] = useState('');
  // const [directionIsVisible, setDirectionIsVisible] = useState(false);
  const property = [
    {
      value: '',
    },
    {
      value: 'Patient',
    },
    {
      value: 'Doctor',
    },
    {
      value: 'Date',
    },
  ];

  const direction = [
    {
      value: '',
    },
    {
      value: 'Ascending',
    },
    {
      value: 'Descending',
    },
  ];

  const sortCollection = (srcCollect, sortByProperty, sortDirection) => {
    sortDirection ? 
    srcCollect.sort((a, b) => a.sortByProperty > b.sortByProperty ? 1 : -1) : //  from smallest to largest
    srcCollect.sort((a, b) => a.sortByProperty < b.sortByProperty ? 1 : -1)   //  from largest to smallest
  }

  const inputPropertyHandler = (e) => {
    setInputProperty(e.target.value);
  }

  const inputDirectionHandler = (e) => {
    setInputDirection(e.target.value);
  }

  return (
    <>
      <Container className="sort-block">
        <Box className="input-property">
          <TextField
            className="propertyField"
            name="inputProperty"
            variant="outlined"
            required
            fullWidth
            id="inputProperty"
            value={inputProperty}
            select
            label="Sort by property"
            type="text"
            onChange={(e) => inputPropertyHandler(e)}
            SelectProps={{
              native: true,
            }}
          >
            {
              property.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.value}
                </option>
              ))
            }
          </TextField>
        </Box>
        {
          inputProperty &&
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
