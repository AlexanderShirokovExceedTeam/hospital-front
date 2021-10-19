import './App.css';
import { Container } from '@material-ui/core';
import SignUp from './components/registration-page';
import HospitalLogo from './components/images/hospital-logo';
import Header from './components/header';

const App = () => {
  return (
    <Container className='App' maxWidth='100%'>
      <Header headerText={'Register in the system'}/>
      <Container className='start-page'>
        <HospitalLogo />
        <SignUp />
      </Container>
    </Container>
  );
}

export default App;
