import './Header.css';
import logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { Modal, Button } from 'react-bootstrap';
import Login from '../login/Login';
import { useState } from 'react';
function Header() {
  // eslint-disable-next-line no-unused-vars
  const [showLogin, setShowLogin] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const openLogin = () => {
    alert('easter egg');
    setShowLogin(true);
  };
  const closeLogin = () => {
    setShowLogin(false);
  };
  const saveLogin = () => {
    alert('saving');
  };
  return (
    <div className="Header">
      <div className="header-left">
        <a href="https://campusrec.mhsoftware.com/" target="_blank" rel="noopener noreferrer">
          <img src={logo} className="logo" />
        </a>
        <h3 style={{ color: '#424242' }} onDoubleClick={openLogin}>
          Badminton Club at UCI
        </h3>
        <Login show_login={showLogin} close_login={closeLogin} save_login={saveLogin} />
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
