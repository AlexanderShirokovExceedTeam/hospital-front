import './contentBlock.scss'
import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';

const ContentBlock = ({ allVisits, setAllVisits }) => {
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8080/allVisits', {
      headers : {
        token: `${token}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then(res => {
      setAllVisits(res.data.data);
    });
  }, [setAllVisits]);
  
  const tempVisitsCollection = (srcObj) => {
    const [ patient, doctor, date, problem, userId ] = srcObj;
  }
  
  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="center">Patient</TableCell>
          <TableCell align="center">Doctor</TableCell>
          <TableCell align="center">Date</TableCell>
          <TableCell align="center">Problem</TableCell>
          <TableCell align="center">Button column</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          allVisits.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.patient}</TableCell>
              <TableCell align="center">{row.doctor}</TableCell>
              <TableCell align="center">{row.date}</TableCell>
              <TableCell align="center">{row.problem}</TableCell>
              <TableCell component="th" scope="row">
                {row.name}
            </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default ContentBlock;
