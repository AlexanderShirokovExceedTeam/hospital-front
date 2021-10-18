import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Box } from '@material-ui/core';

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
  },
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
    if (regLogin.length < 6 || regPassword.length < 6) {
      alert('Login or password is not entered, or their length less than 6 symbols.');
    } else {
      if (regPassword !== regRepPassword) {
        alert('Invalid password')
      } else {
        alert('Succesfull');
        // axios.post('http://localhost:8000/login', {
        //   username: regLogin,
        //   password: regPassword
        // }).then(res => {
        //   localStorage.setItem('token', res.data.token);
        //   history.push('/main');
        // }).catch(err => {
        //   alert('Authentification failed!');
        // })
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box className={classes.paper}>
        <Typography component="h1" variant="h5">
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
                // autoFocus
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
                // autoComplete="current-password"
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
                // autoComplete="current-password"
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
              <Link href="#" variant="body2">
                Authorization
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default SignUp
