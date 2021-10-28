import '../components/modalDelete.scss';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core';
import axios from 'axios';


const DeleteVisit = ({ openDelete, setOpenDelete, unuqieID, setAllVisits}) => {

  const handleDeleteAccept = (unuqieID) => {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:8080/deleteVisit?_id=${unuqieID}`, {
      headers : {
        token: `${token}`,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then(res => {
      setAllVisits(res.data.data);
      setOpenDelete(false);
    });
  }

  return (
    <Dialog
      aria-labelledby="dialog-delete"
      className="dialog-del"
      open={openDelete}
      onClose={() => setOpenDelete(false)}
    >
      <DialogTitle id="dialog-delete">Delete visit</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this visit?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleDeleteAccept(unuqieID)}
          color="primary"
        >
          Delete
        </Button>
        <Button
          onClick={() => setOpenDelete(false)}
          color="primary"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteVisit;
