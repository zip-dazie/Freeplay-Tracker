import './Header.css';
import logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { Modal, Button } from 'react-bootstrap';
import Login from '../Login/Login';
import { useState, useEffect } from 'react';
import { BiLogOut } from 'react-icons/bi';

function Header() {
  // eslint-disable-next-line no-unused-vars
  const [showLogin, setShowLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn');
    return storedLoggedIn ? JSON.parse(storedLoggedIn) : false;
  });
  // eslint-disable-next-line no-unused-vars
  const openLogin = () => {
    setShowLogin(true);
  };
  const closeLogin = () => {
    setShowLogin(false);
  };
  const saveLogin = () => {
    setShowLogin(false);
    setLoggedIn(true);
    window.location.reload();
  };
  const logOut = () => {
    setLoggedIn(false);
    window.location.reload();
  };
  useEffect(() => {
    localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
  }, [loggedIn]);

  return (
    <div className="Header">
      <div className="header-left">
        <a href="https://campusrec.mhsoftware.com/" target="_blank" rel="noopener noreferrer">
          <img src={logo} className="logo" />
        </a>
        <h3 style={{ color: '#424242' }} onClick={openLogin}>
          Badminton Club at UCI
        </h3>
        {loggedIn && <BiLogOut className="tool-icons" onClick={logOut} />}
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
