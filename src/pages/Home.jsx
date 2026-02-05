// startsidan för applikationen
// komponenten hanterar både data-hämtning och felhantering
import { useState, useEffect } from 'react';
import { searchRecipes, getRandomRecipes } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import './Home.css';

function Home() {
  // recipes: Arrayen med recept som ska visas
  const [recipes, setRecipes] = useState([]);
  // loading: Boolean som visar om data håller på att hämtas
  // används för att visa en loading-text
  const [loading, setLoading] = useState(true);
  // error: Innehåller felmeddelanden om något går fel
  // null när allt fungerar, en sträng med meddelande vid fel
  const [error, setError] = useState(null);

  // useEffect körs när komponenten visas första gången
  // [] som andra argument betyder "kör endast en gång vid mount"
  useEffect(() => {
    // Async funktion som hämtar slumpmässiga recept
    const fetchRandomRecipes = async () => {
      try {
        // sätter loading till true innan vi börjar hämta
        setLoading(true);
        // hämtar 8 slumpmässiga recept från API:et
        const data = await getRandomRecipes(8);
        // uppdaterar state med de hämtade recepten
        setRecipes(data);
        // renser eventuella tidigare felmeddelanden
        setError(null);
      } catch (err) {
        // om något går fel, kommer ett felmeddelande
        setError('Could not fetch recipes. Please try again later.');
      } finally {
        // detta körs alltid, oavsett om try lyckas eller catch fångar
        // genom att sätta false indikerar det på att hämtningen är kalr
        setLoading(false);
      }
    };
    // anropar funktionen för att starta hämtningen
    fetchRandomRecipes();
  }, []); // tom array - körs nedast när komponenten mountas

  // denna funktion skickas ner till SearchBar-komponenten som en prop
  // och anropas när användaren söker efter recept
  const handleSearch = async (query) => {
    try {
      // börjar en ny sökning
      setLoading(true);
      // rensar gamla felmeddelanden
      setError(null);
      // hämtar recept baserat på söktermen
      const data = await searchRecipes(query);
      // uppdaterar receptlistan med sökresultat
      setRecipes(data);
      
      // om inga recept hittades, (tom array) visas ett meddelande
      if (data.length === 0) {
        setError('No recipes found. Try a different search term.');
      }
    } catch (err) {
      // visar felmeddelande om sökningen misslyckas
      setError('Could not search recipes. Please try again.');
    } finally {
      // avslutar loading-state
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Discover Recipes</h1>
      {/* SearchBar får handleSearch som callback-funktion */}
      <SearchBar onSearch={handleSearch} />
      {/* visar loading-text medan data hämtas */}
      {loading && <p className="home-message">Loading recipes...</p>}
      {/* visar felmeddelande om något gick fel */}
      {error && <p className="home-error">{error}</p>}
      {/* visar recepten endast när: det inte laddar (!loading) och det INTE finns något fel (!error) */}
      {!loading && !error && (
        <div className="recipes-grid">
          {/* map() loopar genom alla recept och skapar ett RecipeCard för varje
              key={recipe.idMeal} är nödvändigt för react att hålla koll på elementen
              recipe={recipe} skickar receptobjektet som prop till RecipeCard */}
          {recipes.map(recipe => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;