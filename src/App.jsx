// applikationens huvudkomponent som hanterar navigation och routing
// react router används för att skapa en SPA
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    // browserrouter ligger här istället för i main.jsx för enkelhetens skull
    // den möjliggör routing och använder history API för att hantera URL:er utan sidladdning
    <BrowserRouter>
      {/* navbar visas på alla sidor så den ligger utanför routes */}
      <Navbar />
      <Routes>
        {/* varje route definerar en URL-path och vilken komponent som ska visas */}
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;