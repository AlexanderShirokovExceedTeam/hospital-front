import './App.scss';
import { Container } from '@material-ui/core';
import SignUp from './components/registration-page';
import LogIn from './components/authorization-page';
import HospitalLogo from './components/images/hospital-logo';
import Header from './components/header';
import { Route, Switch, Redirect } from 'react-router-dom';
import InputBlock from './components/inputBlock';
import ContentBlock from './components/contentBlock';
import { useState } from 'react';

const App = () => {

  const [allVisits, setAllVisits] = useState([]);

  return (
    <Container className='App' maxWidth='100%'>
      <Switch>
        <Route path='/registration'>
          <Header
            headerText={'Register in the system'}
            exitButton={false}
          />
          <Container className='start-page'>
            <HospitalLogo />
            <SignUp />
          </Container>
        </Route>
        <Route path='/login'>
          <Header
            headerText={'Log in system'}
            exitButton={false}
          />
          <Container className='start-page'>
            <HospitalLogo />
            <LogIn />
          </Container>
        </Route>
        <Route path='/main'>
          <Header
            headerText={'Visits'}
            exitButton={true}
          />
          <InputBlock />
          <ContentBlock
            allVisits={allVisits}
            setAllVisits={setAllVisits}
          />
        </Route>
        <Redirect from='/' to='/registration'/>
      </Switch>
    </Container>
  );
}

export default App;
