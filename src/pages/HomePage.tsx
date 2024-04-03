import { Link } from "react-router-dom";

import profChenImg from "../assets/professor_chen.png";

const HomePage = () => {
  const introParaStyle = "p-3";
  return (
    <div className="HomePage h-full">
      <h1 className="text-center text-4xl m-5">Welcome!</h1>
      <div className="flex">
        <div>
          <img src={profChenImg} alt="image of Professor Chen" />
        </div>
        <div className="m-5">
          <p className={introParaStyle}>
            This website is for all the Pokémon lovers, the eternal children
            filled with nostalgia and remembering fondly their hours spent
            playing on a poorly lit device, capturing small pixelated pocket
            monsters...
          </p>
          <p className={introParaStyle}>
            Take a trip down memory lane with us! Search and sort through the
            first 3 generations of pokemon. That's 386 pokemon in total, from
            <Link to="/pokemon/1">Bulbasaur</Link> to{" "}
            <Link to="/pokemon/386">Deoxys</Link>! And of course,{" "}
            <Link to="/pokemon/25">Pikachu</Link>'s in the lot.
          </p>
          <div>
            <h2 className="text-2xl">Site features</h2>
            <ul className={introParaStyle}>
              <li>
                Search through all the pokémon, filtering by color, name, type,
                generation ... whatever floats your boat!
              </li>
              <li>Create your own team, make it shiny if you wish</li>
              <li>Take a picture with your team</li>
              <li>
                Test your pokémon knowledge and take a trip back to you sitting
                in front of you TV trying to guess WHO'S THAT POKEMON?
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl">And who are we?</h2>
            <p className={introParaStyle}>That's a secret we'll gladly tell!</p>
            <p className={introParaStyle}>
              This website is brought to you by yours truly: Claire, Ivan and
              Raphael. We are three students in the 262 Ironhack WebDev cohort.
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
