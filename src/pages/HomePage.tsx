import { Link } from "react-router-dom";

import profChenImg from "../assets/professor_chen.png";
import pokemon from "../assets/homepage-poke.png";

const HomePage = () => {
  const featureTitle =
    "text-2xl font-bold text-yellow-500 dark:text-white hover:scale-105 hover:text-yellow-500 dark:hover:text-slate-300";
  return (
    <div className="flex flex-col">
      <div className="Header w-full h-full md:border-b-8 md:border-yellow-500 dark:border-white flex flex-col items-center md:bg-blue-50 md:shadow-lg dark:bg-slate-700">
        <img
          src={pokemon}
          alt="image of pokémon"
          className="hidden md:block drop-shadow-lg"
        />
        <h1 className="text-center lg:h-full font-press-start text-xl md:text-4xl p-5 drop-shadow-lg text-yellow-500 dark:text-white">
          Welcome to PokeGET!
        </h1>
      </div>

      <div className="flex flex-col h-full">
        <div className="Intro flex justify-around md:justify-center md:items-center md:gap-20 h-1/2 md:h-1/4">
          <div className="hidden md:block scale-75">
            <img src={profChenImg} alt="image of Professor Chen" />
          </div>
          <div className="Speech text-sm h-full w-full border-double border-4 border-gray-500 md:w-1/2 px-8 py-4 md:py-2 md:px-5 font-press-start flex flex-col justify-center gap-3">
            <p>
              This website is for all the Pokémon lovers, the eternal children
              filled with nostalgia and remembering fondly their hours spent
              playing on a poorly lit device, capturing small pixelated pocket
              monsters...❤️
            </p>
            {"\n"}
            <p>
              Take a trip down memory lane with us! Search and sort through the
              first 3 generations of pokemon. That's 386 pokemon in total, from{" "}
              <Link to="/pokemon/1">
                <span className="text-green-500 font-medium">Bulbasaur</span>
              </Link>{" "}
              to{" "}
              <Link to="/pokemon/386">
                <span className="text-red-500 font-medium">Deoxys</span>
              </Link>
              ! And of course,{" "}
              <Link to="/pokemon/25">
                <span className="text-yellow-400 font-medium">Pikachu</span>
              </Link>
              's in the lot.❤️
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-3xl p-2 bg-blue-900 dark:bg-slate-800 text-white my-2 font-extrabold text-center">
            Site features
          </h2>
          <ul className="text-xl mx-5 flex flex-col gap-4">
            <li className="md:text-center">
              <div className={featureTitle}>
                <Link to="/pokemon">Search through the pokémon</Link>
              </div>
              <div>
                Filter by color, name, type, generation ... whatever floats your
                boat!
              </div>
            </li>
            <li className="text-right md:text-center">
              <div className={featureTitle}>
                <Link to="/team">Create your team</Link>
              </div>
              <div>Make it shiny if you wish</div>
            </li>
            <li className="md:text-center">
              <div className={featureTitle}>
                <Link to="/pikature">Take a picture</Link>
              </div>
              <div>And save it if you want!</div>
            </li>
            <li className="text-right md:text-center">
              <div className={featureTitle}>
                <Link to="/quiz">Test your pokémon knowledge</Link>
              </div>
              <div>
                Take a trip back in front of your TV to guess who's that
                pokémon?
              </div>
            </li>
          </ul>
        </div>
        <div className="text-xl flex flex-col gap-4 text-justify">
          <h2 className="text-3xl p-2 bg-blue-900 dark:bg-slate-800 text-white my-2 font-extrabold text-center">
            And who are we?
          </h2>

          <div className="flex flex-col gap-3 mx-3 md:text-center">
            <p>That's a secret we'll gladly tell!</p>
            <p>
              This website is brought to you by yours truly: Claire, Ivan and
              Raphaël. We are three students in the 262 Ironhack WebDev cohort.
              United by our passion for coding and pokémon, we hope you will
              enjoy this website as much as we enjoyed coding it!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
