import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <header>
        <h1> All-Saints Church</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="events">Account</Link>
          <Link to="donations">Donations</Link>
          <Link to="signup">Signup</Link>
          <Link to="login">Login</Link>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
