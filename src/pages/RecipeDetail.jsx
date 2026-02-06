// denna sida visar all information om ett specifikt recept:
// Bild, titel, kategori, ursprungsland
// Ingredienser med mängder
// Instruktioner
// Länk till YouTube-video (om tillgänglig)
// Möjlighet att lägga till/ta bort från favoriter
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipeById } from '../services/api';
import './RecipeDetail.css';

function RecipeDetail() {
  // useParams() hämtar URL-parametrar från React Router
  // Exempel: om URL:en är /recipe/52772, blir id = "52772"
  const { id } = useParams();
  // recipe: Receptobjektet från API:et (null tills det laddats)
  const [recipe, setRecipe] = useState(null);
  // loading: Boolean för att visa loading-state
  const [loading, setLoading] = useState(true);
  // error: Felmeddelande om något går fel
  const [error, setError] = useState(null);
  // isFavorite: Boolean som visar om detta recept är sparat som favorit
  const [isFavorite, setIsFavorite] = useState(false);

  // useEffect körs när komponenten mountas och när 'id' ändras
  // [id] i dependency array betyder "kör om när id ändras"
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        // Hämtar receptdata från API:et baserat på ID
        const data = await getRecipeById(id);
        setRecipe(data);
        setError(null);

        // Kontroller om detta recept är en favorit
        // localStorage.getItem() hämtar sparad data från webbläsaren
        // 'favorites' är nyckeln vi använder för att spara favoriter
        const saved = localStorage.getItem('favorites');
        // Om det finns sparad data, parsas JSON-strängen till en array
        // Annars skapas en tom array
        // Favoriterna sparas som en array med ID:n: ["52772", "52854", ...]

        const favorites = saved ? JSON.parse(saved) : [];
        // Kontrollerar om det aktuella recept-ID:t finns i favorit-arrayen
        // includes() returnerar true om ID:t finns, annars false
        setIsFavorite(favorites.includes(id));
      } catch (err) {
        setError('Could not fetch the recipe.');
      } finally {
        setLoading(false);
      }
    };
    // Kör om när id ändras (t.ex. om man navigerar till ett annat recept)
    fetchRecipe();
  }, [id]);

  // Lägger till eller tar bort favorit
  const toggleFavorite = () => {
    // Hämtar nuvarande favoriter från localStorage
    const saved = localStorage.getItem('favorites');
    let favorites = saved ? JSON.parse(saved) : [];

    if (isFavorite) {
      // tar bort favoriter
      // filter() skapar en ny array utan det aktuella ID:t
      // favId !== id betyder "behåll alla ID:n UTOM det nuvarande"
      favorites = favorites.filter(favId => favId !== id);
    } else {
      // Lägg till favoriter
      // push() lägger till det nya ID:t i slutet av arrayen
      favorites.push(id);
    }

    // Sparar den uppdaterade favorit-arrayen till localStorage
    // JSON.stringify() konverterar arrayen till en JSON-sträng
    // localStorage kan endast lagra strängar, inte objekt/arrayer
    localStorage.setItem('favorites', JSON.stringify(favorites));
    // Uppdaterar state för att toggla knappens utseende
    // !isFavorite betyder "sätt till motsatsen av det nuvarande värdet"
    setIsFavorite(!isFavorite);
  };

  // early returns för att visa loading/error states
  // Detta förhindrar att resten av komponenten renderas förrän data finns
  if (loading) return <p className="recipe-detail-message">Loading recipe...</p>;
  if (error) return <p className="recipe-detail-error">{error}</p>;
  if (!recipe) return <p className="recipe-detail-error">Recipe not found.</p>;

  // API:et lagrar ingredienser i separata fält: strIngredient1, strIngredient2, osv.
  // Vi behöver extrahera dessa och kombinera med mängder (strMeasure1, strMeasure2, osv.)
  const ingredients = [];
  // loopar från 1 till 20 (API:et har max 20 ingredienser per recept)
  for (let i = 1; i <= 20; i++) {
    // Dynamisk property access med bracket notation
    // recipe[`strIngredient${i}`] blir recipe.strIngredient1, recipe.strIngredient2, osv.
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    // Kontrollerar att ingrediensen faktiskt finns och inte är tom
    // .trim() tar bort mellanslag, så " " blir ""
    if (ingredient && ingredient.trim()) {
      // Kombinerar mängd och ingrediens till en sträng
      // Exempel: "1 cup flour", "2 eggs", "1 tsp salt"
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <div className="recipe-detail-container">
      
      <div className="recipe-detail-header">
        <h1 className="recipe-detail-title">{recipe.strMeal}</h1>
        {/* Favorites-knapp - ändrar utseende baserat på isFavorite */}
        <button className={`recipe-detail-fav-btn ${isFavorite ? 'favorited' : ''}`} onClick={toggleFavorite}> {isFavorite ? 'Favorited' : 'Add to Favorites'}</button>
      </div>

      {/* Receptbild */}
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-detail-image" />

      {/* Kategori och ursprungsland */}
      <div className="recipe-detail-info">
        <span className="recipe-detail-badge">{recipe.strCategory}</span><br/>
        <span className="recipe-detail-badge">{recipe.strArea}</span>
      </div>

      {/* Ingredienser-sektion */}
      <h2 className="recipe-detail-subtitle">Ingredients</h2>
      <ul className="recipe-detail-ingredients">
        {/* map() skapar ett <li>-element för varje ingrediens
            index används som key eftersom ingredienserna inte har unika ID:n */}
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      {/* Instruktioner-sektion */}
      <h2 className="recipe-detail-subtitle">Instructions</h2>
      <p className="recipe-detail-instructions">{recipe.strInstructions}</p>

      {/* Video-sektion (endast om YouTube-länk finns) */}
      {/* && - rendera detta endast om recipe.strYoutube är true */}
      {recipe.strYoutube && (
        <div>
          <h2 className="recipe-detail-subtitle">Video</h2>
          {/* target="_blank" öppnar länken i ny flik
              rel="noopener noreferrer" är säkerhetsåtgärd för externa länkar */}
          <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer" className="recipe-detail-video-link" >Watch on YouTube</a>
        </div>
      )}
    </div>
  );
}

export default RecipeDetail;