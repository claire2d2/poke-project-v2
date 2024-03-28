import React from "react";
import pokeball from "../assets/images/pokeball.png";

const TeamPage = () => {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col items-center justify-center max-w-60 border border-black">
        <h1>POKEMON NAME</h1>
        <img className="pokeball h-44 w-44" src={pokeball} alt="pokeball" />
        <p>TYPES</p>
      </div>
      <div className="flex flex-col items-center justify-center max-w-60 border border-black">
        <h1>POKEMON NAME</h1>
        <img className="pokeball h-44 w-44" src={pokeball} alt="pokeball" />
        <p>TYPES</p>
      </div>
      <div className="flex flex-col items-center justify-center max-w-60 border border-black">
        <h1>POKEMON NAME</h1>
        <img className="pokeball h-44 w-44" src={pokeball} alt="pokeball" />
        <p>TYPES</p>
      </div>
      <div className="flex flex-col items-center justify-center max-w-60 border border-black">
        <h1>POKEMON NAME</h1>
        <img className="pokeball h-44 w-44" src={pokeball} alt="pokeball" />
        <p>TYPES</p>
      </div>
      <div className="flex flex-col items-center justify-center max-w-60 border border-black">
        <h1>POKEMON NAME</h1>
        <img className="pokeball h-44 w-44" src={pokeball} alt="pokeball" />
        <p>TYPES</p>
      </div>
      <div className="flex flex-col items-center justify-center max-w-60 border border-black">
        <h1>POKEMON NAME</h1>
        <img className="pokeball h-44 w-44" src={pokeball} alt="pokeball" />
        <p>TYPES</p>
      </div>
    </div>
  );
};

export default TeamPage;

//reuse the pokecard component and setting up logic in place so that
//all favorited pokemons are passed as props
//--> array for favorites that is limited to length 6?
