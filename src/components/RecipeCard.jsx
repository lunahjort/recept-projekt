// komponent för att visa receptkort, används på home och favorites
// den tar emot ett receptobjekt som prop och renderar info
import { Link } from 'react-router-dom';
import './RecipeCard.css';

// props: recipe - ett objekt med receptinfo från API:et
function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      {/* strMealThumb - URL till receptbilden från API:et
          strMeal - receptets namn, använd som alt-text*/}
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-card-image"/>
      <div className="recipe-card-content">
        {/* receptets namn/titel */}
        <h3 className="recipe-card-title">{recipe.strMeal}</h3>
        {/* receptets kategori */}
        <p className="recipe-card-category">{recipe.strCategory}</p>
        {/* receptets ursprungsland*/}
        <p className="recipe-card-area">{recipe.strArea}</p>
        {/* länk till detaljsidan för receptet*/}
        <Link to={`/recipe/${recipe.idMeal}`} className="recipe-card-button">View Recipe</Link>
      </div>
    </div>
  );
}

export default RecipeCard;