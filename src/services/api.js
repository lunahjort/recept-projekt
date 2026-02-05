// starten för alla API-anrop, ingen nyckel behövs
// varje funktion är async eftersom API-anrop tar tid att slutföra
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// första funktionen: searchRecipes

// sök efter recept med sökord (ex. searchRecipes("chicken")
// parametrar: query (string) - vad användaren söker efter (t.ex. "chicken")
// returnerar: array med matchande recept, eller tom array om inget hittas
export const searchRecipes = async (query) => {
  try {
    // fetch hämtar data och await väntar tills svaret kommer
    // template literal (backticks) används för att infoga variabeln query i URL:en
    const response = await fetch(`${BASE_URL}/search.php?s=${query}`);
    // konvertering av svaret till JS-objekt
    const data = await response.json();
    // returnerar recept, om ingentings hittas: || [] = om data.meals är null, så blir den en tom array
    return data.meals || [];
  } catch (error) {
    // catch fångar fel, ex. nätverksfel eller om API:et är nere
    console.error('Something went wrong with the search:', error);
    // throw skickar felet till komponenten som anropade funktionen
    // så att komponenten kan visa ett felmeddelande till användaren
    throw error;
  }
};

// andra funktionen: getRecipeById

// hämta ett specifikt recept
// parametrar: id (string/number) - receptets unika ID (t.ex. "52772")
// returnerar: ett receptobjekt, eller null om receptet inte hittas
export const getRecipeById = async (id) => {
  try {
    // hämtar receptet baserat på ID
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data = await response.json();
    // API:et returnerar alltid en array, även för ett enda recept
    // data.meals[0] hämtar första (och enda) receptet från arrayen
    // Om data.meals är null (receptet finns inte) returneras null
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error('Something went wrong with the recipes:', error);
    throw error;
  }
};

// tredje funktionen: getRandomRecipes

// hämta slumpmässiga recept baserat på antal 
// parametrar: count (number) - antal recept att hämta (standard: 8)
// returnerar: array med slumpmässiga recept
export const getRandomRecipes = async (count = 8) => {
  // count = 8 betyder att om funktionen anropas utan argument,
  // kommer 8 att användas som standardvärde
  try {
    // Array(count) skapar en array med 'count' antal tomma platser
    // .fill() fyller varje plats (behövs för att .map ska fungera)
    // .map() ersätter varje plats med ett fetch-anrop till random-endpointen
    // varje anrop returnerar ETT slumpmässigt recept
    const promises = Array(count).fill().map(() =>
      fetch(`${BASE_URL}/random.php`).then(res => res.json())
    );
    // fetch returnerar ett Promise, .then() hanterar svaret direkt
    // Promise.all() väntar tills ALLA anrop är klara
    // om ett anrop misslyckas, misslyckas hela operationen
    // detta är effektivt eftersom alla anrop körs samtidigt (parallellt)
    const results = await Promise.all(promises);
    // Varje resultat innehåller { meals: [recept] }
    // .map() extraherar det första receptet från varje resultat
    // Resultatet blir en array med 'count' antal recept
    return results.map(result => result.meals[0]);
  } catch (error) {
    console.error('Something went wrong with getting a random recipe:', error);
    throw error;
  }
};