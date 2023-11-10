import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/members/signup', {
        method: 'POST',
        body: JSON.stringify({ userName, email, phoneNumber, password }),
        headers: { 'Content-Type': 'Application/json' },
        credentials: 'include',
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
      } else {
        // Successful response, show a toast and navigate
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="Signup">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>UserName:</label>
        <input
          type="text"
          placeholder="userName001"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="email"
          placeholder="abc@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>PhoneNumber:</label>
        <input
          type="number"
          placeholder="+254-792-454-039"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Signup</button>

        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Signup;
