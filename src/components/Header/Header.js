import './Header.css';
import { Avatar } from '@mui/material';
import { green } from '@mui/material/colors'
import login from '../../assets/login.jpg';

function Header() {
  return (
    <div className="Header">
      <p className="title">Badminton Club Free Play Tracker</p>
      <div className="login">
        <Avatar sx={{ bgcolor: green[500], height: 60, width: 60, fontSize: 30 }}>A</Avatar>
      </div>
    </div>
  );
}

export default Header;
