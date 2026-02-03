import './About.css';

function About() {
  return (
    <div className="about-container">
      <h1 className="about-title">About The Recipe App</h1>
      
      <p className="about-text">
        This is a school project in React where I build a Single Page Application 
        to discover and explore recipes from around the world.
      </p>

      <h2 className="about-subtitle">Technologies Used:</h2>
      <ul className="about-list">
        <li>React</li>
        <li>React Router</li>
        <li>CSS</li>
        <li>TheMealDB API</li>
      </ul>

      <h2 className="about-subtitle">Features:</h2>
      <ul className="about-list">
        <li>Search for recipes</li>
        <li>View detailed information</li>
        <li>Random recipes on home page</li>
        <li>Favorites</li>
      </ul>
    </div>
  );
}

export default About;