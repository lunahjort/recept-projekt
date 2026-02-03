import { useState, useEffect } from 'react';
import { getRecipeById } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import './Favorites.css';

function Favorites() {
  // Hämtar sparade favoriter från localStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hämtar recept-data för varje favorit-ID
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Hämtar varje favorit-recept baserat på ID
        const recipePromises = favorites.map(id => getRecipeById(id));
        const results = await Promise.all(recipePromises);
        // Filtrerar bort null-värden om ett recept inte hittades
        setRecipes(results.filter(recipe => recipe !== null));
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [favorites]);

  // Ta bort en favorit
  const removeFavorite = (id) => {
    const updated = favorites.filter(favId => favId !== id);
    setFavorites(updated);
    // Sparar uppdaterad lista till localStorage
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">My Favorites ❤️</h1>

      {loading && <p className="favorites-message">Loading favorites...</p>}

      {!loading && recipes.length === 0 && (
        <div className="favorites-empty">
          <p className="favorites-message">You have no favorites yet!</p>
          <p className="favorites-info">
            Click the ❤️ button on a recipe to add it here.
          </p>
        </div>
      )}

      {!loading && recipes.length > 0 && (
        <div className="favorites-grid">
          {recipes.map(recipe => (
            <div key={recipe.idMeal} className="favorites-card-wrapper">
              <RecipeCard recipe={recipe} />
              <button className="favorites-remove-btn" onClick={() => removeFavorite(recipe.idMeal)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;