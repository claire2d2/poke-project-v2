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

const useDebouncedValue = (inputValue: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay]);

  return debouncedValue;
};

const AllPokemon = () => {
  const [pokemon, setPokemon] = useState<Array<PokeObject>>([]);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebouncedValue(search, 300);

  async function fetchAllPokemon() {
    try {
      const { data } = await axios.get(
        "https://poke-backend.adaptable.app/pokemons"
      );
      setPokemon(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllPokemon();
  }, [debouncedSearch]);

  return (
    <div className="flex">
      <Sidebar search={search} setSearch={setSearch} />
      <div className="flex flex-wrap gap-2">
        {pokemon
          .filter((onePoke) =>
            onePoke.name.toLowerCase().includes(debouncedSearch.toLowerCase())
          )
          .map((onePoke) => (
            <div
              key={onePoke.name}
              className="border flex flex-col items-center m-2 gap-1"
            >
              <Link to={`/pokemon/${onePoke.name}`}>
                <div className="flex flex-col w-52 gap-2 justify-center items-center">
                  <PokeCard pokeName={onePoke.name} />
                </div>
              </Link>
              <p>♡</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllPokemon;
