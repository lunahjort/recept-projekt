import { Link } from 'react-router-dom';
import './RecipeCard.css';

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <img 
        src={recipe.strMealThumb} 
        alt={recipe.strMeal}
        className="recipe-card-image"
      />
      <div className="recipe-card-content">
        <h3 className="recipe-card-title">{recipe.strMeal}</h3>
        <p className="recipe-card-category">📁 {recipe.strCategory}</p>
        <p className="recipe-card-area">🌍 {recipe.strArea}</p>
        <Link to={`/recipe/${recipe.idMeal}`} className="recipe-card-button">
          View Recipe
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;