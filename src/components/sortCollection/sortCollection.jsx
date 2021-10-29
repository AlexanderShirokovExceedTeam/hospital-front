import { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Box,
  Container,
  Button,
  Typography
} from '@material-ui/core';
import './sortCollection.scss';

const SortCollection = ({ allVisits, setAllVisits, sortedVisits, setSortedVisits }) => {
  const [inputDirection, setInputDirection] = useState('Ascending');
  const [inputProperty, setInputProperty] = useState('');
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
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

  const clickOpenFilterHandler = () => {
    setFilterIsOpen(true);
  }

  const clickFilterHandler = () => {
    console.log('sortedVisits before', sortedVisits);
    setSortedVisits([...allVisits]);
    console.log('sortedVisits after', sortedVisits);
    if (filterDateFrom && filterDateTo) {
      setAllVisits([...allVisits.filter(allVisits => allVisits.date.substring(0, 10) >= filterDateFrom && allVisits.date.substring(0, 10) <= filterDateTo)]);
      // setSortedVisits([...sortedVisits.filter(sortedVisits => sortedVisits.date.substring(0, 10) >= filterDateFrom && sortedVisits.date.substring(0, 10) <= filterDateTo)]);
    }
    if (!filterDateFrom) {
      setAllVisits([...allVisits.filter(allVisits => allVisits.date.substring(0, 10) <= filterDateTo)]);
      // setSortedVisits([...sortedVisits.filter(sortedVisits => sortedVisits.date.substring(0, 10) <= filterDateTo)]);
    }
    if (!filterDateTo) {
      setAllVisits([...allVisits.filter(allVisits => allVisits.date.substring(0, 10) >= filterDateFrom)]);
      // setSortedVisits([...sortedVisits.filter(sortedVisits => sortedVisits.date.substring(0, 10) >= filterDateFrom)]);
    }
  }

  const clickAbortFilterHandler = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8080/allVisits', {
      headers : {
        token: `${token}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then(res => {
      setAllVisits(res.data.data);
      setFilterIsOpen(false);
      setFilterDateFrom('');
      setFilterDateTo('');
    });
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
        {
          filterIsOpen &&
          <>
            <Box className="date-filter-from">
              <Typography className="date-filter-from-text">
                From:
              </Typography>
              <TextField
                className="date-filter-from-field"
                name="filterDateFrom"
                onChange={(e) => setFilterDateFrom(e.target.value)}
                id="filterDateFrom"
                type="date"
                variant="outlined"
                value={filterDateFrom}
                autoComplete='off'
                required
                fullWidth
              />
            </Box>
            <Box className="date-filter-to">
            <Typography className="date-filter-to-text">
                To:
              </Typography>
              <TextField
                className="date-filter-to-field"
                name="filterDateTo"
                onChange={(e) => setFilterDateTo(e.target.value)}
                id="filterDateTo"
                type="date"
                variant="outlined"
                value={filterDateTo}
                autoComplete='off'
                required
                fullWidth
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => clickFilterHandler()}
            >
              Filter
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => clickAbortFilterHandler()}
            >
              Abort filter
            </Button>
          </>
        }
        {
          !filterIsOpen &&
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => clickOpenFilterHandler()}
          >
            Open filter
          </Button>
        }
      </Container>
    </>
  )
}

export default SortCollection;
