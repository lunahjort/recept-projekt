// sökfältskomponent som hanterar sökfunktionaliteten
// tar emot en callback-funktion (onSearch) från föräldrakomponenten och anropar när man söker
import { useState } from 'react';
import './SearchBar.css';

// props: onSearch - callback-funktion när använder söker
function SearchBar({ onSearch }) {
  // state håller reda på vad användaren skriver i sökfältet
  // useState ('') initialiserar med en tom sträng
  const [query, setQuery] = useState('');

  // hanterar formulärets submit-event (enter eller klickar på search)
  const handleSubmit = (e) => {
    // förhindrar att sidan laddar om
    e.preventDefault();
    // kontrollerar att användaren skrivit någor
    // .trim() tar bort mellanslag i början + slut
    // om query.trim() är en tom sträng händer inget
    if (query.trim()) {
      // anropar callback-funktionen från home och skickar med söktermen
      onSearch(query);
    }
  };

  return (
    // onSubmit körs när formuläret skickas (enter eller knapp)
    <form onSubmit={handleSubmit} className="search-form">
      {/* textfält där användaren skriver sin sökning */}
      <input type="text" 
        // value={query} gör detta till ett "controlled input"
        // vilket betyder att react kontrollerar värdet
        value={query} 
        // onChange körs varje gång användaren skriver
        // e.target.value är det nya värdet i inputfältet
        // setQuery uppdaterar state med det nya värdet
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search for recipes..." 
        className="search-input"/>
      <button type="submit" className="search-button">Search</button>
    </form>
  );
}

export default SearchBar;