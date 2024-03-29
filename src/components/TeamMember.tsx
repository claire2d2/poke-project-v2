import React from "react";
import pokeball from "../assets/images/pokeball.png";
import pokeApi from "../service/pokeApi";
import { useState, useEffect } from "react";

type pokeObject = {
  species: { name: string };
  sprites: { front_default: string };
  types: Array<pokeTypes>;
};

type pokeTypes = {
  type: { name: string };
};

const TeamMember: React.FC<{ pokeId: number }> = ({ pokeId }) => {
  const [pokeData, setPokeData] = useState<pokeObject | null>(null);

  async function fetchPokeData() {
    try {
      const response = await pokeApi.get<pokeObject>(`/pokemon/${pokeId}`);
      setPokeData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPokeData();
  }, [pokeId]);

  return (
    <div className="flex flex-row">
      <div className="flex flex-col items-center justify-center max-w-60 border border-black">
        <h1>{pokeData?.species.name}</h1>
        <img
          className="pokeball h-44 w-44"
          src={pokeData?.sprites.front_default}
          alt="pokeball"
        />
        <p>
          {pokeData?.types.map((el: pokeTypes) => {
            return <span> {el.type.name} </span>;
          })}
        </p>
      </div>{" "}
    </div>
  );
};

export default TeamMember;
