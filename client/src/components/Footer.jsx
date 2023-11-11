import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import 'font-awesome/css/font-awesome.min.css';
import { useState } from 'react';

const Footer = () => {
  const [isLoggedin] = useState(true);
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <div className="mobile-btn">
            <ion-icon name="grid"></ion-icon>
          </div>
          <div className="logo">
            <img src="church.png" alt="" />
          </div>
          <h1>
            <i> All-Saints Church</i>
          </h1>
        </div>
        <div className="footer-links">
          <ul className="links">
            {isLoggedin && (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/events">Events</Link>
                </li>
                <li>
                  <Link to="/sermons">Sermons</Link>
                </li>
                <li>
                  <Link to="/donations">Donations</Link>
                </li>
                <li>
                  <Link to="/myJourney">My-Journey</Link>
                </li>
              </>
            )}
            {!isLoggedin && (
              <>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="footer-social">
          <ul className="links">
            <li>
              <Link to="https://www.facebook.com/home.php" target="_blank">
                <FaFacebook />
              </Link>
            </li>
            <li>
              <Link to="https://twitter.com/" target="_blank">
                <FaTwitter />
              </Link>
            </li>
            <li>
              <Link to="https://www.instagram.com/" target="_blank">
                <FaInstagram />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} All-Saints Church . All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
