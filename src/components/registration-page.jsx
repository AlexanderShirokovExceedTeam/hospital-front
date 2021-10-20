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
  Snackbar
} from '@material-ui/core';
import './form-page.scss';

const SignUp = () => {
  const history = useHistory();
  
  const [regLogin, setRegLogin] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRepPassword, setRegRepPassword] = useState('');
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackmessage, setSnackmessage ] = useState('');
  
  const loginHandler = (e) => {
    setRegLogin(e.target.value);
  }
  
  const passwordHandler = (e) => {
    setRegPassword(e.target.value);
  }
  
  const rPasswordHandler = (e) => {
    setRegRepPassword(e.target.value);
  }

  const snackMessage = (message) => {
    setSnackmessage(`${message}`);
    setSnackbarOpen(true);
  }
  
  const clickRegHandler = (e) => {
    e.preventDefault();
    if (regLogin.length < 6 || regPassword.length < 6 || !/\d/.test(regPassword) || !/[a-zA-Z]/.test(regPassword)) {
      return snackMessage('Login or password is not entered, or they invalid.')
    }

    if (regPassword !== regRepPassword) {
      return snackMessage('Passwords does not match.')
    }
    
    setSnackmessage('User is created.');
    setSnackbarOpen(true);
    axios.post('http://localhost:8080/userRegistration', {
      username: regLogin,
      password: regPassword
    }).then(res => {
      localStorage.setItem('token', res.data.token);
      history.push('/main');
    }).catch(err => {
      snackMessage('Authentification failed.');
    });
  }

  return (
    <Container className='signup-block' component='div' maxWidth='xs'>
      <Typography align='center' component="h1" variant="h5">
        Registration
      </Typography>
      <form className='signup-form' noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="fname"
              name="logIn"
              variant="outlined"
              required
              fullWidth
              id="logIn"
              label="Log in"
              onChange={(e) => loginHandler(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => passwordHandler(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="repeat password"
              label="Repeat password"
              type="password"
              id="Repeat password"
              onChange={(e) => rPasswordHandler(e)}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="signup-button"
          onClick={(e) => clickRegHandler(e)}
        >
          Register
        </Button>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          open={isSnackbarOpen}
          autoHideDuration={2000}
          onClose={() => setSnackbarOpen(false)}
          message={snackmessage}
        />
        <Grid container justifyContent="center">
          <Grid item>
            <Link href="/login" variant="body2">
              Authorization
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default SignUp
