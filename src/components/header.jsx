import {
  Typography,
  Button,
  Container
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PatchLogo from './images/patch-logo';
import './headerStyles.scss'

const Header = ({ headerText, exitButton }) => {
  const history = useHistory();

  const clickExitHandler = () => {
    history.push('/login');
    localStorage.clear();
  }

  return (
    <Container className="header-page">
      <PatchLogo/>
      {/* <Container className={`header-text ${exitButton ? 'button' : 'without-button'}`}></Container> */}
      <Container className='header-text'>
        <Typography className='text'>
          {headerText}
        </Typography>
      </Container>
        {
          exitButton &&
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="exit-button"
            onClick={() => clickExitHandler()}
          >
            Exit
          </Button>
        }
    </Container>
  )
}

export default Header;
