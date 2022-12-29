import './Header.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="Header">
      <Link to="/" className="header-left">
        <img src={logo} className="logo" />
        <p>Badminton Club at UCI</p>
      </Link>
      <div className="header-right">
        <Link to="/" className="link free-play">
          FREE PLAY
        </Link>
        <Link to="/how-it-works" className="link how-it-works">
          HOW IT WORKS
        </Link>
        <Link to="/signup" className="link sign-up">
          SIGN UP
        </Link>
      </div>
    </div>
  );
}

export default Header;
