import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import backendApi from "../service/backendApi";
import Sidebar from "../components/Sidebar";
import PokeCard from "../components/PokeCard";
import FaveButton from "../components/FaveButton";

// Type
type PokeObject = {
  id: number;
  name: string;
  image: string;
  type: string[];
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

  // const [favoritePokemonIds, setFavoritePokemonIds] = useState<number[]>([]);
  // const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const debouncedSearch = useDebouncedValue(search, 300);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchFilter = searchParams.get("name");
  const generationFilter = searchParams.get("generation");
  const typeFilter = searchParams.get("type");

  let searchParamsURL = "?_embed=favorites";

  // Fetch Pokemon data
  async function fetchAllPokemon() {
    try {
      if (!searchParamsURL) {
        searchParamsURL = "";
      }
      if (searchFilter) {
        searchParamsURL += `&name_like=${searchFilter}`;
      }
      if (generationFilter) {
        searchParamsURL += `&generation=${generationFilter}`;
      }
      if (typeFilter) {
        searchParamsURL += `&type=${typeFilter}`;
      }
      const { data } = await backendApi.get("/pokemons" + searchParamsURL);
      setPokemon(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllPokemon();
  }, [debouncedSearch, searchParams]);

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
  // const fetchFavoritePokemonIds = async () => {
  //   try {
  //     const { data } = await backendApi.get("/favorite");
  //     setFavoritePokemonIds(data.map((favorite: any) => favorite.pokemonId));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const filterByFavorites = () => {
  //   if (showFavorites) {
  //     fetchAllPokemon();
  //   } else {
  //     const favoritePokemon = pokemon.filter((onePoke) =>
  //       favoritePokemonIds.includes(onePoke.id)
  //     );
  //     setPokemon(favoritePokemon);
  //   }
  //   setShowFavorites(!showFavorites);
  // };

  // useEffect(() => {
  //   fetchFavoritePokemonIds();
  // }, [generation]);

  return (
    <div className="flex">
      <Sidebar search={search} setSearch={setSearch} />
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
          {/* <div className="flex gap-2">
            <button
              onClick={filterByFavorites}
              className="bg-blue-200 rounded-lg py-0.5 px-2"
            >
              {showFavorites ? "Show all" : "Show favorites"}
            </button>
          </div> */}
        </div>
        <div className="grid grid-cols-6 grid-flow-row gap-2">
          {pokemon
            // .filter(
            //   (onePoke) =>
            //     onePoke.name &&
            //     onePoke.name
            //       .toLowerCase()
            //       .includes(debouncedSearch.toLowerCase())
            // )
            .map((onePoke) => (
              <div
                key={onePoke.id}
                className="flex flex-col items-center gap-1 border rounded shadow hover:shadow-md transition-all"
              >
                <Link to={`/pokemon/${onePoke.id}`}>
                  <div className="flex flex-col w-auto justify-center items-center">
                    <PokeCard pokeData={onePoke} />
                  </div>
                </Link>
                <FaveButton pokeId={onePoke.id} heartSize={2} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllPokemon;
