import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  resetUserName,
  setUsersName,
} from '../features/userName/userNameSlice';
import { resetIsloggedIn } from '../features/isLoggedIn/isLoggedInSlice';
import { setIsVisible } from '../features/isVisible/isVisibleSlice';

const AccountNavbar = () => {
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usersName = useSelector((state) => state.userNameValue.userName);

  //const [isVisible, setIsVisible] = useState(true);
  const isVisible = useSelector((state) => state.isVisibleValue.isVisible);

  const handleGoBack = () => {
    dispatch(setIsVisible()); // Set visibility to false
  };

  //logout function
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/members/logout', {
        credentials: 'include',
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
      } else {
        console.log(json);
        dispatch(resetUserName());
        dispatch(resetIsloggedIn());
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const [isClicked, setIsclicked] = useState(false);
  const handleClick = async () => {
    setIsclicked(!isClicked);
    const response = await fetch('http://localhost:5000/api/members/user', {
      credentials: 'include',
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    } else {
      console.log(json);
      setUserName(json.userName);
      setPhoneNumber(json.phoneNumber);
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      'http://localhost:5000/api/members/userPatch',
      {
        method: 'PATCH',
        body: JSON.stringify({ userName, phoneNumber }),
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
      }
    );
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    } else {
      console.log('success', json.userName);
      dispatch(setUsersName(json.userName));
    }
    setIsclicked(false);
  };
  return (
    <>
      {isVisible && (
        <div className="account-navbar">
          {/* Back navigation icon */}
          <div className="back-icon" onClick={handleGoBack}>
            <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          </div>
          {/*header and user's name  */}
          <div className="navbar-header">
            {usersName && (
              <h3 className="userName">{usersName + "'s"} Account</h3>
            )}
          </div>
          {/* edit profile btn and edit form */}
          <div>
            <button className="edit-btn" onClick={handleClick}>
              Edit Profile
            </button>
            {isClicked && (
              <div>
                <form className="edit-form" onSubmit={handleEdit}>
                  <label>UserName</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <label>phoneNumber</label>
                  <input
                    type="number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <button>Edit</button>
                </form>
              </div>
            )}
          </div>
          {/* logout button */}
          <div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </>
  );
};

export default AccountNavbar;
