// navigationskomponent
// använder react routers link-komponent utan att ladda om hela sidan
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="navbar-logo">The Recipe App</h2>
      <div className="navbar-links">

        {/* Link används istället för <a> eftersom det förhindrar sidladdning
            och istället använder react router för navigation.
            'to' attributet anger vilken route som ska aktiveras */}
            
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/favorites" className="navbar-link">Favorites</Link>
        <Link to="/about" className="navbar-link">About</Link>
      </div>
    </nav>
  );
}

export default Navbar;