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

const LogIn = () => {
  const history = useHistory();

  const [regLogin, setRegLogin] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackmessage, setSnackmessage ] = useState('');
  
  const loginHandler = (e) => {
    setRegLogin(e.target.value);
  }
  
  const passwordHandler = (e) => {
    setRegPassword(e.target.value);
  }

  const snackMessage = (message) => {
    setSnackmessage(`${message}`);
    setSnackbarOpen(true);
  }

  const clickAuthHandler = (e) => {
    e.preventDefault();
    if (regLogin.length < 6 || regPassword.length < 6 || !/\d/.test(regPassword) || !/[a-zA-Z]/.test(regPassword)) {
      return snackMessage('Login or password is not entered, or they invalid.')
    }
    
    snackMessage('Authorization was successful.');
    axios.post('http://localhost:8080/userAuthentification', {
      username: regLogin,
      password: regPassword
    }).then(res => {
      localStorage.setItem('token', res.data.token);
      history.push('/main');
    }).catch(err => {
      snackMessage('Authentification failed.');
    }) 
  }

  return (
    <Container className='signup-block auth' component='div' maxWidth='xs'>
      <Typography align='center' component="h1" variant="h5">
        Authorization
      </Typography>
      <form className='login-form' noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              // autoComplete="fname"
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
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="login-button"
          onClick={(e) => clickAuthHandler(e)}
        >
          Authorization
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
            <Link href="/registration" variant="body2">
              Register
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default LogIn;
