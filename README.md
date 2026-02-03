# Recept-App
En Single Page Application (SPA) byggd i React för att upptäcka och utforska recept från hela världen.

## Tekniker
- React + React Router
- TheMealDB API
- CSS

## Funktioner
- Söka efter recept
- Se detaljerad receptinformation
- Responsiv design
- Möjlighet att favoritmarkera recept

## Kom igång

### Förutsättningar
- Node.js
- npm

### Installation och körning
1. **Klona eller ladda ned projektet**

2. **Installera beroenden**
````
npm install
````

3. **Starta utvecklingsservern** 
```
npm run dev
```
4. Öppna projektet i webbläsaren med länken som visas (ex. http://localhost:***)

## Kravspecifikation
### G-krav (godkänt)
- React SPA med client-side routing
- Minst 3 routes (/, /recipe/:id, /favorites, /about)
- Navigation med React Router (Link)
- Återanvändbara komponenter med props
- useState för interaktivitet (sökfunktion)
- useEffect + fetch för API-anrop
- Loading state och felhantering
- Data från API visas i UI
- README

### VG-krav (väl godkänt)
- Tydlig filstruktur (components/, pages/, services/)
- Extra route (4 totalt)
- useParams för dynamisk routing (/recipe/:id)
- Teknisk reflektion (visas nedan)
- Favorites-funktion med localStorage

## Tekniska val - reflektion

### Mapp och filstruktur
Projektet är indelat i tre huvudmappar under src/: components, pages och services. Jag valde att dela upp koden på detta sätt för att hålla projektet organiserat och lätthanterligt. Components innehåller återanvändbara komponenter som kan brukas på flera sidor, medan pages innehåller sidorna som är kopplade till en specifik route. Services isolerar all API-kommunikation från komponenterna, vilket gör att om API:et ändras behöver jag bara ändra i en fil.

### Routing-upplägg
Jag valde att använda React Router med BrowserRouter som täcker hela appen i App.jsx. Routing-strukturen är uppbyggd med en delad Navbar som syns på alla sidor. Jag beslutade mig för att lägga alla Routes i App.jsx eftersom projektet är tillräckligt 
litet för att inte behöva en separat router-fil. Den dynamiska routen /recipe/:id fungerar med useParams för att hämta specifika recept.

### Komponentindelning
Appen är delad i tre typer av komponenter: sidkomponenter (Home, RecipeDetail, Favorites, About), återanvändbara komponenter (Navbar, RecipeCard, SearchBar) och service-funktioner (api.js). Jag valde att hålla RecipeCard och SearchBar som 
separata komponenter eftersom de har tydliga, avgränsbara ansvarsområden och kan potential brukas på andra sidor.

### Props-lösning
RecipeCard tar emot ett recipe-objekt via props och visar upp datan. Jag valde att 
skicka hela recipe-objektet istället för enskilda värden (ex: name, image) eftersom 
det minskar antalet props och gör komponenten enklare att använda. SearchBar tar 
emot en onSearch-funktion via props för att kommunicera med förälderkomponenten.

### State-lösning
Jag använde useState för att hantera söktext, laddningsindikatorer, felmeddelanden och favoriter. Favoriterna sparas i localStorage så att de bevaras mellan sessioner.
Jag valde lokal state istället för global state eftersom applikationen är tillräckligt liten för att inte behöva dela state mellan många komponenter.

### Val av API
Jag valde TheMealDB API eftersom det är gratis, kräver ingen API-nyckel och har god dokumentation. Det tillhandahåller en sorts funktionalitet som sök, random och lookup som passade för detta projekt. 

## Projektstruktur
```
src/
├── components/
├── pages/ 
├── services/
├── App.jsx
└── index.css
```
## API
Projektet använder [TheMealDB API](https://www.themealdb.com/api.php) - ett gratis recept-API.

## Författare
Luna Hjort