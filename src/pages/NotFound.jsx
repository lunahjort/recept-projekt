import './NotFound.css';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <h2 className="notfound-subtitle">The page could not be found</h2>
      <p className="notfound-text">
        Unfortunately, we could not find the page you are looking for.</p>
      <Link to="/" className="notfound-button">Back to start</Link>
    </div>
  );
}

export default NotFound;