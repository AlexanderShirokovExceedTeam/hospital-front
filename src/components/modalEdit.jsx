import '../components/modalEdit.scss';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button
} from '@material-ui/core';
import axios from 'axios';
import { useState } from 'react';


const EditVisit = ({ openEdit, setOpenEdit, setAllVisits, editedVisit, doctors, setInputName, setInputDoctor, setInputDate, setInputProblem }) => {

  const { _id, patient, doctor, date, problem, userId } = editedVisit;

  const [editPatient, setEditPatient] = useState(patient);
  const [editDoctor, setEditDoctor] = useState(doctor);
  const [editDate, setEditDate] = useState(date);
  const [editProblem, setEditProblem] = useState(problem);

  const handleEditAccept = () => {
    const token = localStorage.getItem('token');
    axios.patch('http://localhost:8080/updateVisit', {
      _id: _id,
      patient: editPatient,
      doctor: editDoctor,
      date: editDate,
      problem: editProblem
    }, {
      headers : {
        token: `${token}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then(res => {
      setAllVisits(res.data.data);
    });    
    setOpenEdit(false);
  }

  const inputNameHandler = (e) => {
    setEditPatient(e.target.value);
  }
  
  const inputDoctorHandler = (e) => {
    setEditDoctor(e.target.value);
  }
  
  const inputDateHandler = (e) => {
    setEditDate(e.target.value);
  }
  
  const inputProblemHandler = (e) => {
    setEditProblem(e.target.value);
  }

  return (
    <Dialog
      aria-labelledby="dialog-edit"
      open={openEdit}
      onClose={() => setOpenEdit(false)}
    >
      <DialogTitle id="dialog-edit">Edit visit</DialogTitle>
      <DialogContent>
        <DialogContentText margin="dense">Name:</DialogContentText>
        <TextField
          autoFocus
          className="nameField"
          name="inputName"
          variant="outlined"
          required
          fullWidth
          id="inputName"
          value={patient}
          type="text"
          onChange={(e) => inputNameHandler(e)}
          margin="dense"
        />
        <DialogContentText margin="dense">Doctor:</DialogContentText>
        <TextField
          className="doctorField"
          name="inputDoctor"
          variant="outlined"
          required
          fullWidth
          id="inputDoctor"
          value={doctor}
          select
          type="text"
          onChange={(e) => inputDoctorHandler(e)}
          SelectProps={{
            native: true,
          }}
          margin="dense"
        >
          {
            doctors.map((option) => (
              <option key={option.value} value={option.value}>
                {option.value}
              </option>
            ))
          }
        </TextField>
        <DialogContentText margin="dense">Date:</DialogContentText>
        <TextField
          className="dateField"
          name="inputDate"
          onChange={(e) => inputDateHandler(e)}
          id="inputDate"
          type="date"
          variant="outlined"
          value={date}
          autoComplete='off'
          required
          fullWidth
          margin="dense"
        />
        <DialogContentText margin="dense">Problem:</DialogContentText>
        <TextField
          className="problemField"
          name="inputProblem"
          variant="outlined"
          required
          fullWidth
          id="inputProblem"
          value={problem}
          type="text"
          onChange={(e) => inputProblemHandler(e)}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleEditAccept()}
          color="primary"
        >
          Edit
        </Button>
        <Button
          onClick={() => setOpenEdit(false)}
          color="primary"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditVisit;
