// useState = hantera state, useEffect = köra kod vid rendering
import { useState, useEffect } from 'react';

// useParams = hämta ID från URL (ex: /recipe/52772)
// Link = navigera utan att ladda ny sida
import { useParams, Link } from 'react-router-dom';

// Importerar API-funktionen för att hämta ett enskilt recept
import { getRecipeById } from '../services/api';

import './RecipeDetail.css';

function RecipeDetail() {
  const { id } = useParams();

  // State-variabler för att hantera komponentens data
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  

  // useEffect körs när komponenten laddas eller när id ändras
  useEffect(() => {
    // async funktion för att hämta receptet
    const fetchRecipe = async () => {
      try {
        setLoading(true);          
        const data = await getRecipeById(id);
        setRecipe(data);
        setError(null);
      } catch (err) {
        // Om API-anropet failar, spara felmeddelande
        setError('Could not fetch the recipe.');
      } finally {
        // Finally körs alltid - oavsett om det gick bra eller inte
        setLoading(false);                       // Stopp ladda
      }
    };

    fetchRecipe();  // Anropar funktionen
  }, [id]);

  // Tidiga Returns - visar meddelanden innan datan är redo
  // Detta avoider att koden nedan körs om data saknar
  if (loading) return <p className="recipe-detail-message">Loading recipe...</p>;
  if (error) return <p className="recipe-detail-error">{error}</p>;
  if (!recipe) return <p className="recipe-detail-error">Recipe not found.</p>;

  // Extraherar ingredienser från API-datan
  // TheMealDB sparar ingredienser som strIngredient1, strIngredient2, osv.
  // Så vi loopar genom 1-20 och plockar ut alla som finns
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];  // Ex: recipe["strIngredient1"]
    const measure = recipe[`strMeasure${i}`];        // Ex: recipe["strMeasure1"]

    // Kontroller att ingrediensen finns och inte är tomma spaces
    if (ingredient && ingredient.trim()) {
      // Kombinerar mängd och ingrediens (ex: "200g Chicken")
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  // Renderar receptet
  return (
    <div className="recipe-detail-container">

      <Link to="/" className="recipe-detail-back">← Back</Link>

      <h1 className="recipe-detail-title">{recipe.strMeal}</h1>

      <img 
        src={recipe.strMealThumb} 
        alt={recipe.strMeal}
        className="recipe-detail-image"
      />

      <div className="recipe-detail-info">
        <span className="recipe-detail-badge">📁 {recipe.strCategory}</span>
        <span className="recipe-detail-badge">🌍 {recipe.strArea}</span>
      </div>

      <h2 className="recipe-detail-subtitle">Ingredients</h2>
      <ul className="recipe-detail-ingredients">
        {ingredients.map((ingredient, index) => (
          // key={index} behövs för att React ska hålla kolla på varje item
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h2 className="recipe-detail-subtitle">Instructions</h2>
      <p className="recipe-detail-instructions">{recipe.strInstructions}</p>

      {recipe.strYoutube && (
        <div>
          <h2 className="recipe-detail-subtitle">Video</h2>
          <a 
            href={recipe.strYoutube} 
            target="_blank"
            rel="noopener noreferrer"
            className="recipe-detail-video-link"
          >
            Watch on YouTube
          </a>
        </div>
      )}
    </div>
  );
}

export default RecipeDetail;