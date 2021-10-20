import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import {
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  makeStyles,
  Container
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

const LogIn = () => {  
  const classes = useStyles();
  const history = useHistory();

  const [regLogin, setRegLogin] = useState('');
  const [regPassword, setRegPassword] = useState('');
  
  const loginHandler = (e) => {
    setRegLogin(e.target.value);
  }
  
  const passwordHandler = (e) => {
    setRegPassword(e.target.value);
  }

  const clickAuthHandler = (e) => {
    e.preventDefault();
    if (regLogin.length < 6 || regPassword.length < 6 || !/\d/.test(regPassword) || !/[a-zA-Z]/.test(regPassword)) {
      return alert('Login or password is not entered, or they invalid.');
    }

    alert('Succesfull');
    axios.post('http://localhost:8080/userAuthentification', {
      username: regLogin,
      password: regPassword
    }).then(res => {
      localStorage.setItem('token', res.data.token);
      history.push('/main');
    }).catch(err => {
      alert('Authentification failed!');
    }) 
  }

  return (
    <Container className='signup-block auth' component='div' maxWidth='xs'>
      <Typography align='center' component="h1" variant="h5">
        Authorization
      </Typography>
      <form className={classes.form} noValidate>
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
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={(e) => clickAuthHandler(e)}
        >
          Authorization
        </Button>
        <Grid container justifyContent="center">
          <Grid item>
            <Link href="/" variant="body2">              
              Register
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default LogIn;
