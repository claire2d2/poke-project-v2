import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PokeCard from "../components/PokeCard";
import Sidebar from "../components/Sidebar";

type PokeObject = {
  id: number;
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
    <div className="flex">
      <Sidebar />
      <div className="flex flex-wrap gap-2">
        {pokemon.map((onePoke) => {
          return (
            <div
              key={onePoke.name}
              className="border flex flex-col items-center m-2 gap-1"
            >
              <Link to={`/pokemon/${onePoke.name}`}>
                <div className="flex flex-col w-52 gap-2 justify-center items-center">
                  <PokeCard pokeName={onePoke.name} />
                  <h1 className="text-lg">{onePoke.name}</h1>
                </div>
              </Link>
              <p>♡</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllPokemon;
