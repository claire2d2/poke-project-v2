import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

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
      <div className="container flex">
        <Sidebar />
        <div>
          {pokemon.map((onePoke) => {
            return (
              <div key={onePoke.name}>
                <Link to={`/pokemon/${onePoke.name}`}>
                  <h1>{onePoke.name}</h1>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <a></a>
    </div>
  );
};

export default AllPokemon;
