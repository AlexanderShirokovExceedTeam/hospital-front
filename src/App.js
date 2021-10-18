import './App.css';
import SignUp from './components/registration-page';
// import { SvgIcon } from '@material-ui/core';
import HospitalLogo from './components/images/hospital-logo';
import { Box } from '@material-ui/core';

function App() {
  return (
    <Box className="App">
      {/* <SvgIcon>
      </SvgIcon> */}
      <HospitalLogo />
      <SignUp />
    </Box>
  );
}

export default App;
