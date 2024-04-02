import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import backendApi from "../service/backendApi";
import Sidebar from "../components/Sidebar";
import PokeCard from "../components/PokeCard";
import FaveButton from "../components/FaveButton";

// Type
type favorite = {
  pokemonId: number;
  id: number;
};
type PokeObject = {
  id: number;
  name: string;
  image: string;
  type: string[];
  generation: string;
  favorite: favorite[];
};

// Debounced for search bar
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

// Component
const AllPokemon = () => {
  const [pokemon, setPokemon] = useState<Array<PokeObject>>([]);
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebouncedValue(search, 300);

  const [favoritePokemonIds, setFavoritePokemonIds] = useState<number[]>([]);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedGenerations, setSelectedGenerations] = useState<string[]>([]);

  // Fetch Pokemon data

  const fetchFilteredPokemon = async () => {
    try {
      const { data } = await backendApi.get(
        `/pokemons?_embed=favorite&name_like=${debouncedSearch}`
      );
      setPokemon(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFilteredPokemon();
  }, [debouncedSearch]);

  // Sort by A-Z filter
  const sortPokemonByAZ = () => {
    const sortedPokemon = [...pokemon].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setPokemon(sortedPokemon);
  };

  // Sort by Z-A filter
  const sortPokemonByZA = () => {
    const sortedPokemon = [...pokemon].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
    setPokemon(sortedPokemon);
  };

  // Sort by favorites
  const fetchFavoritePokemonIds = async () => {
    try {
      const { data } = await backendApi.get("/favorite");
      setFavoritePokemonIds(data.map((favorite: any) => favorite.pokemonId));
    } catch (error) {
      console.log(error);
    }
  };

  const filterByFavorites = () => {
    if (showFavorites) {
      fetchFilteredPokemon();
    } else {
      const favoritePokemon = pokemon.filter((onePoke) =>
        favoritePokemonIds.includes(onePoke.id)
      );
      setPokemon(favoritePokemon);
    }
    setShowFavorites(!showFavorites);
  };

  useEffect(() => {
    fetchFavoritePokemonIds();
  }, []);

  let displayedPoke;
  if (selectedTypes.length || selectedGenerations.length) {
    displayedPoke = pokemon.filter((onePoke) => {
      const typeMatch =
        selectedTypes.length === 0 ||
        onePoke.type.some((type) => selectedTypes.includes(type));
      const generationMatch =
        selectedGenerations.length === 0 ||
        selectedGenerations.includes(onePoke.generation);

      return typeMatch && generationMatch;
    });
  } else {
    displayedPoke = pokemon;
  }

  return (
    <div className="flex">
      <Sidebar
        search={search}
        setSearch={setSearch}
        setSelectedTypes={setSelectedTypes}
        setSelectedGenerations={setSelectedGenerations}
      />
      <div className="flex flex-col gap-2 p-2 w-full">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <button
              onClick={sortPokemonByAZ}
              className="bg-blue-200 rounded-lg py-0.5 px-2"
            >
              A-Z
            </button>
            <button
              onClick={sortPokemonByZA}
              className="bg-blue-200 rounded-lg py-0.5 px-2"
            >
              Z-A
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={filterByFavorites}
              className="bg-blue-200 rounded-lg py-0.5 px-2"
            >
              {showFavorites ? "Show all" : "Show favorites"}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-6 grid-flow-row gap-2">
          {displayedPoke.map((onePoke) => (
            <div
              key={onePoke.id}
              className="flex flex-col items-center gap-1 border rounded shadow hover:shadow-md transition-all"
            >
              <Link to={`/pokemon/${onePoke.id}`}>
                <div className="flex flex-col w-auto justify-center items-center">
                  <PokeCard pokeData={onePoke} />
                </div>
              </Link>
              <div>
                <FaveButton
                  isFave={onePoke.favorite.length === 0 ? false : true}
                  currPoke={onePoke}
                  heartSize={3}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPokemon;
