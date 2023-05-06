import './Footer.css';

function Footer() {
  return (
    <div className="Footer">
      <div className="footer-left">
        <p className="footer-text">Made with 💙 by zip-dazie</p>
        <p className="footer-text">2023 © Badminton Club at UCI — Version 1.1.0</p>
      </div>
      <div className="footer-right">
        <a
          href="https://www.facebook.com/groups/ucibadminton"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="https://getzelos.com/wp-content/themes/zelos/assets/icon-facebook.svg" />
        </a>
        <a href="https://www.instagram.com/ucibadminton/" target="_blank" rel="noopener noreferrer">
          <img src="https://getzelos.com/wp-content/themes/zelos/assets/icon-instagram.svg" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
