import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  resetIsloggedIn,
  setIsloggedIn,
} from './features/isLoggedIn/isLoggedInSlice';
import { resetUserName, setUsersName } from './features/userName/userNameSlice';
import Test from './pages/Test';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'http://localhost:5000/api/members/isLoggedIn',
        {
          credentials: 'include',
        }
      );
      const json = await response.json();
      console.log(json);
      if (!response.ok) {
        dispatch(resetIsloggedIn());
        dispatch(resetUserName());
      } else {
        dispatch(setIsloggedIn(json.value));
        dispatch(setUsersName(json.userName));
      }
    };
    fetchData();
  }, [dispatch]);
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
