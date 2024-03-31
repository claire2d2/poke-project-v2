// import style
import { Link } from "react-router-dom";
import { TeamTitle } from "./TeamPageStyle";

const FindPoke = () => {
  // TODO : finish search bar

  const testArray = [
    "Pikachu",
    "Pikaray",
    "Raichu",
    "lolilol",
    "Abra",
    "hoothoot",
    "yeah",
    "okay",
  ];

  return (
    <div className="h-full">
      <TeamTitle>Find a pokémon</TeamTitle>
      <div className="flex flex-col group">
        <div className="w-5/6 group-focus-within:block">
          <label htmlFor="find-poke">Name of pokémon:</label>
          <input
            className="w-full border-2 border-gray-100 group"
            name="find-poke"
            type="text"
          />
          <ul className="bg-white w-full hidden group-focus-within:block">
            {testArray.length > 10
              ? "Please refine your search"
              : testArray.map((el) => {
                  return <li>{el}</li>;
                })}
          </ul>
          <p>Add POKEMON?</p>
          <button>Yes!</button>
        </div>
      </div>
    </div>
  );
};

export default FindPoke;
