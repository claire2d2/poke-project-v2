import axios from "axios";
import { useState, useEffect } from "react";

type PokeObject = {
  name: string;
  url: string;
};

const AllPokemon = () => {
  const [pokemon, setPokemon] = useState<Array<PokeObject>>([]);

  async function fetchAllPokemon() {
    try {
      const { data } = await axios.get(
        "https://poke-backend.adaptable.app/results"
      );
      setPokemon(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllPokemon();
  }, []);

  return (
    <div>
      {pokemon.map((onePoke) => {
        return (
          <div key={onePoke.name}>
            <a href={onePoke.url}>
              <h1>{onePoke.name}</h1>
            </a>
          </div>
        );
      })}
      <a></a>
    </div>
  );
};

export default AllPokemon;
