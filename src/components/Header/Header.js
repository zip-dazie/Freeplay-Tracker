import './Header.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="Header">
      <Link to="/Freeplay-Tracker" className="header-left">
        <img src={logo} className="logo" />
        <h3 style={{ color: '#424242' }}>Badminton Club at UCI</h3>
      </Link>
      <div className="header-right">
        <Link to="/Freeplay-Tracker" className="link free-play">
          FREE PLAY
        </Link>
        <Link to="/how-it-works" className="link how-it-works">
          HOW IT WORKS
        </Link>
        <Link to="/register" className="link register">
          REGISTER
        </Link>
      </div>
    </div>
  );
}

export default Header;
