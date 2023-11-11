import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import AccountNavbar from './AccountNavbar';
import { resetIsVisible } from '../features/isVisible/isVisibleSlice';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedInValue.isLoggedIn);
  const dispatch = useDispatch();
  const [showAccountNavbar, setShowAccountNavbar] = useState(false);

  const toggleAccountNavbar = () => {
    dispatch(resetIsVisible());
    setShowAccountNavbar(!showAccountNavbar);
  };

  return (
    <div className="navbar">
      <header>
        <h1> All-Saints Church</h1>

        {isLoggedIn && (
          <nav>
            <>
              <Link to="/">Home</Link>
              <Link to="events">Events</Link>
              <Link to="donations">Donate</Link>
              <Link to="sermons">Sermons</Link>
              <Link to="myJourney">My-Journey</Link>
            </>
          </nav>
        )}
        {!isLoggedIn && (
          <nav>
            <>
              <Link to="/">Home</Link>
              <Link to="events">Events</Link>
              <Link to="donations">Donate</Link>
              <Link to="signup">Signup</Link>
              <Link to="login">Login</Link>
            </>
          </nav>
        )}
        {isLoggedIn && (
          <>
            <FontAwesomeIcon
              className="account-icon"
              icon={faUser}
              size="lg"
              onClick={toggleAccountNavbar}
            />
            {showAccountNavbar && <AccountNavbar />}
          </>
        )}
        {/* {error && <div className="error">{error}</div>} */}
      </header>
    </div>
  );
};

export default Navbar;
