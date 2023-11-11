import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsloggedIn } from '../features/isLoggedIn/isLoggedInSlice';
import { setUsersName } from '../features/userName/userNameSlice';
import { setIsVisible } from '../features/isVisible/isVisibleSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/members/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'Application/json' },
        credentials: 'include',
      });
      const json = await response.json();
      //get the user's name from the json above
      console.log(json.value);
      if (!response.ok) {
        setError(json.error);
      } else {
        console.log(json.value, json.userName);
        dispatch(setIsloggedIn(json.value));
        dispatch(setUsersName(json.userName));
        dispatch(setIsVisible());
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          placeholder="abc@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
