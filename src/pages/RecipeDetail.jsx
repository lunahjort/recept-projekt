import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipeById } from '../services/api';
import './RecipeDetail.css';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Hämtar sparade favoriter från localStorage
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const data = await getRecipeById(id);
        setRecipe(data);
        setError(null);

        // Kontroller om detta recept är en favorit
        const saved = localStorage.getItem('favorites');
        const favorites = saved ? JSON.parse(saved) : [];
        setIsFavorite(favorites.includes(id));
      } catch (err) {
        setError('Could not fetch the recipe.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  // Lägger till eller tar bort favorit
  const toggleFavorite = () => {
    const saved = localStorage.getItem('favorites');
    let favorites = saved ? JSON.parse(saved) : [];

    if (isFavorite) {
      // Ta bort från favoriter
      favorites = favorites.filter(favId => favId !== id);
    } else {
      // Lägg till till favoriter
      favorites.push(id);
    }

    // Spara uppdaterad lista till localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  if (loading) return <p className="recipe-detail-message">Loading recipe...</p>;
  if (error) return <p className="recipe-detail-error">{error}</p>;
  if (!recipe) return <p className="recipe-detail-error">Recipe not found.</p>;

  // Extraherar ingredienser från API-datan
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <div className="recipe-detail-container">
      
      <div className="recipe-detail-header">
        <h1 className="recipe-detail-title">{recipe.strMeal}</h1>
        {/* Favorites-knapp - ändrar utseende baserat på isFavorite */}
        <button className={`recipe-detail-fav-btn ${isFavorite ? 'favorited' : ''}`} onClick={toggleFavorite}> {isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites'}</button>
      </div>
      
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-detail-image" />

      <div className="recipe-detail-info">
        <span className="recipe-detail-badge">📁 {recipe.strCategory}</span>
        <span className="recipe-detail-badge">🌍 {recipe.strArea}</span>
      </div>

      <h2 className="recipe-detail-subtitle">Ingredients</h2>
      <ul className="recipe-detail-ingredients">
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h2 className="recipe-detail-subtitle">Instructions</h2>
      <p className="recipe-detail-instructions">{recipe.strInstructions}</p>

      {recipe.strYoutube && (
        <div>
          <h2 className="recipe-detail-subtitle">Video</h2>
          <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer" className="recipe-detail-video-link" >Watch on YouTube</a>
        </div>
      )}
    </div>
  );
}

export default RecipeDetail;