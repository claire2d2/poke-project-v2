import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PokeCard from "../components/PokeCard";

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
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllPokemon();
  }, []);

  return (
    <div className="flex flex-wrap gap-2">
      {pokemon.map((onePoke) => {
        return (
          <div key={onePoke.name}>
            <Link to={`/pokemon/${onePoke.name}`}>
              <div className="flex flex-col p-5 border w-52 justify-center items-center">
                <PokeCard pokeName={onePoke.name} />
                <h1>
                  {onePoke.name.charAt(0).toUpperCase() + onePoke.name.slice(1)}
                </h1>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default AllPokemon;
