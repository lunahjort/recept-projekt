// starten för alla API-anrop
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// sök efter recept med sökord (ex. searchRecipes("chicken")
// det returnerar då en array med matchande recept
export const searchRecipes = async (query) => {
    try {
        //fetch hämtar data och await väntar tills svaret kommer
        const response = await fetch ('${BASE_URL}/search.php?s=${query}');

        // konvertering av svaret till JS-objekt
        const data = await response.json();

        // returnerar recept, om ingentings hittas: || [] = om data.meals är null, så blir den en tom array
        return data.meals || [];
    }
    catch (error) {
        // catch fångar fel 

        console.error('Something went wrong with the search:', error);

        // throw skickar felet till komponenten som anropade funktionen
        throw error;
    }
};

// hämta ett specifikt recept (ex. getRecipeById("54673") och returnerar sedan objektet
export const getRecipeById = async (id) => {
    try {

        // hämtar recpetet baserat på ID
        const response = await fetch('${BASE_URL}/lookup.php?i=${id}');
        const data = await response.json();

        //returnerar en array, men bara första recpetet. därav data.meals[0], om det finns kommer första annars null
        return data.meals ? data.meals[0] : null;
    }
    catch (error) {
        console.error('Something went wrong with the recipes:', error);
        throw error;
    }
}

// hämta slumpmässiga recept baserat på antal (ex. getRandomRecipes(8)
// returnera en array med antalet recept
export const getRandomRecipes = async (count = 8) => {
    // om funktionen kallas utan argument, 8 blir default värde

    try {
        // Array(count).fill() skapar en array med 8 tomma platser
        //.map() ersätter varje plats med fetch-anrop
        const promises = Array(count).fill().map(() =>
            fetch(`${BASE_URL}/random.php`).then(res => res.json())
    );
    
    // promise.all väntar tills alla requests är klara, om en inte går igenom gör ingen det
    const results = await Promise.all(promises);

    // här plockas första receptet från varje resultat
    return results.map(result => result.meals[0]);
    
    }
    catch (error) {
        console.error('Something went wrong with getting a random recipe:', error);
        throw error;
    }
};