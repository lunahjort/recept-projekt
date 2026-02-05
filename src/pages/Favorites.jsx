// denna sida visar alla recept som användaren har markerat som favoriter.
// favoriter hämtas från localStorage och receptdata hämtas från API:et.
// användaren kan också ta bort recept från sina favoriter här.
import { useState, useEffect } from 'react';
import { getRecipeById } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import './Favorites.css';

function Favorites() {
  // favorites: Array med favorit-ID:n (strängar)
  // initialiseras med en funktion som körs en gång vid mount
  // detta mönster (lazy initial state) och används för att
  // undvika att läsa från localStorage vid varje render
  const [favorites, setFavorites] = useState(() => {
    // hämtar sparade favoriter från localstorage
    const saved = localStorage.getItem('favorites');
    // JSON-strängen till array eller returnerar en tom array
    return saved ? JSON.parse(saved) : [];
  });
  // recipes: Array med fullständiga receptobjekt (hämtade från API:et)
  const [recipes, setRecipes] = useState([]);
  // loading: Boolean för loading-state
  const [loading, setLoading] = useState(true);

  // useEffect körs när komponenten mountas och när 'favorites' ändras
  // [favorites] i dependency array betyder "kör om när favorites ändras"
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // favorites är en array med ID:n: ["52772", "52854", ...]
        // Vi behöver konvertera varje ID till ett fullständigt receptobjekt
        
        // .map() skapar en array av Promises (ett API-anrop för varje ID)
        // Varje anrop hämtar receptdata baserat på ID
        const recipePromises = favorites.map(id => getRecipeById(id));
        // Promise.all() väntar tills alla API-anrop är klara
        // Detta är effektivt eftersom alla anrop körs parallellt
        // results blir en array med receptobjekt: [{recipe1}, {recipe2}, ...]
        const results = await Promise.all(recipePromises);
        // Om ett recept har tagits bort från API:et, returnerar getRecipeById null
        // .filter() tar bort alla null-värden från arrayen
        // recipe !== null betyder "behåll endast recept som inte är null"
        setRecipes(results.filter(recipe => recipe !== null));
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        // Avslutar loading-state oavsett om det lyckas eller misslyckas
        setLoading(false);
      }
    };

    // anropar funktionen för att börja hämta receptdata
    fetchFavorites();
  }, [favorites]); // kör om när favorites-arrayen ändras

  // funktion som tar bort ett recept från favoriter
  const removeFavorite = (id) => {
    // filter() skapar en ny array utan det angivna ID:t
    // favId !== id betyder "behåll alla ID:n UTOM det som ska tas bort"
    const updated = favorites.filter(favId => favId !== id);
    // Uppdaterar state med den nya favorit-arrayen
    // Detta triggar en re-render och useEffect körs igen

    setFavorites(updated);
    // Sparar den uppdaterade favorit-listan till localStorage
    // så att ändringen finns kvar vid nästa besök
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">My Favorites ❤️</h1>
      {/* Visar loading-text medan receptdata hämtas */}
      {loading && <p className="favorites-message">Loading favorites...</p>}
      {/* Visar ett meddelande om användaren inte har några favoriter
          Detta visas endast när: den inte laddar (!loading) 
          och receptarrayen är tom (recipes.length === 0) */}
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
          {/* map() loopar genom alla favoritrecept */}
          {recipes.map(recipe => (
            // Vi wrappar varje RecipeCard i en div för att kunna
            // lägga till en "Remove"-knapp under kortet
            <div key={recipe.idMeal} className="favorites-card-wrapper">
              {/* Återanvänder RecipeCard-komponenten för att visa receptet */}
              <RecipeCard recipe={recipe} />
              {/* Remove-knapp för att ta bort receptet från favoriter
                  onClick använder en arrow function för att skicka med
                  receptets ID till removeFavorite-funktionen */}
              <button className="favorites-remove-btn" onClick={() => removeFavorite(recipe.idMeal)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;