import "./App.css";
import { Routes, Route } from "react-router-dom";

// import pages
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import AllPokemon from "./pages/AllPokemon";
import OnePoke from "./pages/OnePoke";
import NotFound from "./pages/NotFound";
import TeamPage from "./pages/TeamPage";
import PictureTime from "./pages/PictureTime";
import QuizPage from "./pages/QuizPage";

function App() {
  return (
    <div className="App h-screen w-screen dark:text-stone-200 dark:bg-slate-700">
      <div className="pages h-full w-full">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="pokemon">
              <Route index element={<AllPokemon />} />
              <Route path=":pokeId" element={<OnePoke />} />
            </Route>
            <Route path="team" element={<TeamPage />} />
            <Route path="pikature" element={<PictureTime />} />
            <Route path="quiz" element={<QuizPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
