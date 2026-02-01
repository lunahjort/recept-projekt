import { useState, useEffect } from 'react';
import { searchRecipes, getRandomRecipes } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import './Home.css';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      try {
        setLoading(true);
        const data = await getRandomRecipes(8);
        setRecipes(data);
        setError(null);
      } catch (err) {
        setError('Could not fetch recipes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRandomRecipes();
  }, []);

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchRecipes(query);
      setRecipes(data);
      
      if (data.length === 0) {
        setError('No recipes found. Try a different search term.');
      }
    } catch (err) {
      setError('Could not search recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Discover Recipes</h1>
      
      <SearchBar onSearch={handleSearch} />

      {loading && <p className="home-message">Loading recipes...</p>}
      
      {error && <p className="home-error">{error}</p>}

      {!loading && !error && (
        <div className="recipes-grid">
          {recipes.map(recipe => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;