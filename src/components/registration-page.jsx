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

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  
  const [regLogin, setRegLogin] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRepPassword, setRegRepPassword] = useState('');  
  
  const loginHandler = (e) => {
    setRegLogin(e.target.value);
  }
  
  const passwordHandler = (e) => {
    setRegPassword(e.target.value);
  }
  
  const rPasswordHandler = (e) => {
    setRegRepPassword(e.target.value);
  }
  
  const clickRegHandler = (e) => {
    e.preventDefault();
    if (regLogin.length < 6 || regPassword.length < 6 || !/\d/.test(regPassword) || !/[a-zA-Z]/.test(regPassword)) {
      return alert('Login or password is not entered, or they invalid.');
    }

    if (regPassword !== regRepPassword) {
      return alert('Invalid password')
    }

    alert('Succesfull');
    axios.post('http://localhost:8080/userRegistration', {
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
    <Container className='signup-block' component='div' maxWidth='xs'>
      <Typography align='center' component="h1" variant="h5">
        Registration
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
          className={classes.submit}
          onClick={(e) => clickRegHandler(e)}
        >
          Register
        </Button>
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