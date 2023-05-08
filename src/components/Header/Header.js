import './Header.css';
import logo from '../../assets/logo.png';
//import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
function Header() {
  return (
    <div className="Header">
      <div className="header-left">
        <a href="https://campusrec.mhsoftware.com/" target="_blank" rel="noopener noreferrer">
          <img src={logo} className="logo" />
        </a>
        <h3 style={{ color: '#424242' }}>Badminton Club at UCI</h3>
      </div>
      <div className="header-right">
        <NavLink to="/Freeplay-Tracker" className="link free-play">
          FREE PLAY
        </NavLink>
        <NavLink to="/how-it-works" className="link how-it-works">
          HOW IT WORKS
        </NavLink>
        <NavLink to="/register" className="link register">
          REGISTER
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
