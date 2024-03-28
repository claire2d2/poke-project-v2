import "./App.css";
import { Routes, Route } from "react-router-dom";

// import pages
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import AllPokemon from "./pages/AllPokemon";
import OnePoke from "./pages/OnePoke";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="pokemon">
            <Route index element={<AllPokemon />} />
            <Route path=":pokeId" element={<OnePoke />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
