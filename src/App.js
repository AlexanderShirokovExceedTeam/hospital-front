import './App.scss';
import { Container } from '@material-ui/core';
import SignUp from './components/registration-page';
import LogIn from './components/authorization-page';
import HospitalLogo from './components/images/hospital-logo';
import Header from './components/header';
import { Route, Switch, Redirect } from 'react-router-dom';

const App = () => {
  return (
    <Container className='App' maxWidth='100%'>
      <Switch>
        <Route path='/registration'>
          <Header headerText={'Register in the system'}/>
          <Container className='start-page'>
            <HospitalLogo />
            <SignUp />
          </Container>
        </Route>
        <Route path='/login'>
          <Header headerText={'Log in system'}/>
          <Container className='start-page'>
            <HospitalLogo />
            <LogIn />
          </Container>
        </Route>
        <Route path='/main'>
          <Header headerText={'Visits'}/>
        </Route>
        <Redirect from='/' to='/registration'/>
      </Switch>
    </Container>
  );
}

export default App;
