import { Link } from "react-router-dom";

import profChenImg from "../assets/professor_chen.png";

const HomePage = () => {
  return (
    <div className="h-full">
      <h1 className="text-center text-4xl p-5">Welcome!</h1>
      <div className="flex justify-center items-start gap-10 my-5 mx-10">
        <div className="w-2/12 hidden md:block">
          <img
            src={profChenImg}
            alt="image of Professor Chen"
            className="max-h-96"
          />
        </div>
        <div className="w-fit md:w-8/12 px-5">
          <p>
            This website is for all the Pokémon lovers, the eternal children
            filled with nostalgia and remembering fondly their hours spent
            playing on a poorly lit device, capturing small pixelated pocket
            monsters...
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
            's in the lot.
          </p>
          <div>
            <h2 className="text-2xl p-2">Site features</h2>
            <ul>
              <li>
                • Search through all the pokémon, filtering by color, name,
                type, generation ... whatever floats your boat!
              </li>
              <li>• Create your own team, make it shiny if you wish.</li>
              <li>• Take a picture with your team.</li>
              <li>
                • Test your pokémon knowledge and take a trip back to you
                sitting in front of you TV trying to guess WHO'S THAT POKEMON?
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl p-2">And who are we?</h2>
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
