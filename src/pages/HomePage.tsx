import { Link } from "react-router-dom";

import profChenImg from "../assets/professor_chen.png";
import pokemon from "../assets/homepage-poke.png";
//import downArrow from "../assets/down-arrow.png";
import arrow from "../assets/arrow.svg";

const HomePage = () => {
  const featureTitle =
    "text-2xl font-bold text-yellow-500 dark:text-white flex justify-center";
  return (
    <div className="flex flex-col">
      <div className="Header py-32 w-full h-full md:border-b-8 md:border-yellow-500 dark:border-gray-600 flex flex-col items-center md:bg-blue-50 md:shadow-lg dark:bg-slate-700">
        <img
          src={pokemon}
          alt="image of pokémon"
          className="hidden md:block drop-shadow-lg"
        />
        <h1 className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mt-10 text-center lg:h-full font-press-start text-xl md:text-4xl p-5 text-yellow-500 dark:text-white">
          Welcome to PokémonGET!
        </h1>
        <img
          src={arrow}
          alt="arrow pointing down"
          className="h-10 mt-10 fill-current text-white"
        />
      </div>

      <div className="flex flex-col h-full pb-16">
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
        <div className="border-y-8 border-yellow-500 dark:border-gray-600 py-20">
          <h2 className="text-3xl p-2 font-press-start mb-10 mt-5 font-extrabold text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            Site features
          </h2>
          <ul className="text-l mx-5 flex flex-col gap-8">
            <li className="md:text-center">
              <div className={featureTitle}>
                <div className="w-fit hover:scale-105 dark:hover:text-slate-300 hover:text-yellow-500">
                  <Link className=" hover:text-yellow-500" to="/pokemon">
                    Search through the Pokémon
                  </Link>
                </div>
              </div>
              <div>
                Filter by color, name, type, generation... whatever floats your
                boat!
              </div>
            </li>
            <li className="text-right md:text-center">
              <div className={featureTitle}>
                <div className="w-fit hover:scale-105 hover:text-yellow-500 dark:hover:text-slate-300">
                  <Link className=" hover:text-yellow-500" to="/team">
                    Create your team
                  </Link>
                </div>
              </div>
              <div className="text-center">Make it shiny if you wish</div>
            </li>
            <li className="md:text-center">
              <div className={featureTitle}>
                <div className="w-fit hover:scale-105 hover:text-yellow-500 dark:hover:text-slate-300">
                  <Link className=" hover:text-yellow-500" to="/pikature">
                    Take a picture
                  </Link>
                </div>
              </div>
              <div className="text-center">And save it if you want!</div>
            </li>
            <li className="text-right md:text-center">
              <div className={featureTitle}>
                <div className="w-fit hover:scale-105 hover:text-yellow-500 dark:hover:text-slate-300">
                  <Link className=" hover:text-yellow-500" to="/quiz">
                    Test your Pokémon knowledge
                  </Link>
                </div>
              </div>
              <div>
                Take a trip back in front of your TV to guess who's that
                Pokémon?
              </div>
            </li>
          </ul>
        </div>
        <div className="text-xl flex flex-col gap-4 text-justify py-10">
          <h2 className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-press-start text-3xl p-2 text-white my-2 font-extrabold text-center">
            And who are we?
          </h2>

          <div className="flex flex-col gap-3 mx-3 md:text-center items-center">
            <p className="text-center">
              That's a secret we'll gladly tell! This website is brought to you
              by yours truly:
            </p>

            <div className="flex text-center items-center gap-3 p-3">
              <a
                href="https://www.linkedin.com/in/claireyuansong/"
                target="_blank"
                className="text-blue-900 dark:text-stone-200 hover:text-yellow-500 font-medium pr-4"
              >
                Claire Song
              </a>
              <a
                href="https://www.linkedin.com/in/ivanpstoyanov/"
                target="_blank"
                className="text-blue-800 dark:text-stone-200 hover:text-yellow-500 font-medium  pr-4"
              >
                Ivan Stoyanov
              </a>
              <a
                href="https://www.linkedin.com/in/simonraphael/"
                target="_blank"
                className="text-blue-800 dark:text-stone-200 hover:text-yellow-500 font-medium"
              >
                Raphaël Simon
              </a>
            </div>
            <p> We are three students in the 262 Ironhack WebDev cohort</p>
            <p> united by our passion for coding and pokémon. </p>
            <p className="py-5 font-bold text-yellow-500 font-press-start text-base">
              We hope you will enjoy this website as much as we enjoyed coding
              it!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
