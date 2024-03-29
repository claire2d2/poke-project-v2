import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PokeCard from "../components/PokeCard";
import Sidebar from "../components/Sidebar";
import FaveButton from "../components/FaveButton";

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
      <div className="grid grid-cols-6 grid-flow-row p-2">
        {pokemon
          .filter(
            (onePoke) =>
              onePoke.name &&
              onePoke.name.toLowerCase().includes(debouncedSearch.toLowerCase())
          )
          .map((onePoke) => (
            <div
              key={onePoke.name}
              className="flex flex-col items-center m-2 gap-1 border rounded shadow hover:shadow-md transition-all"
            >
              <Link to={`/pokemon/${onePoke.name}`}>
                <div className="flex flex-col w-auto justify-center items-center">
                  <PokeCard pokeName={onePoke.name} />
                </div>
              </Link>
              <FaveButton pokeId={onePoke.id} heartSize={2} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllPokemon;
