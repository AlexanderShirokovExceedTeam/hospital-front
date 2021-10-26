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

  const [inputName, setInputName] = useState('');
  const [inputDoctor, setInputDoctor] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [inputProblem, setInputProblem] = useState('');

  const doctors = [
    {
      value: '',
    },
    {
      value: 'Jonathan Sins',
    },
    {
      value: 'Gregory House',

    },
    {
      value: 'Emmett Brown',
    },
    {
      value: 'Rick Sanchez',
    },
  ];

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
          <InputBlock
            setAllVisits={setAllVisits}
            doctors={doctors}
            inputName={inputName}
            setInputName={setInputName}
            inputDoctor={inputDoctor}
            setInputDoctor={setInputDoctor}
            inputDate={inputDate}
            setInputDate={setInputDate}
            inputProblem={inputProblem}
            setInputProblem={setInputProblem}
          />
          <ContentBlock
            allVisits={allVisits}
            setAllVisits={setAllVisits}
            doctors={doctors}
          />
        </Route>
        <Redirect from='/' to='/registration'/>
      </Switch>
    </Container>
  );
}

export default App;
