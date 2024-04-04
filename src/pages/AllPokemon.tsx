import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import backendApi from "../service/backendApi";
import Sidebar from "../components/Sidebar";
import PokeCard from "../components/PokeCard";
import FaveButton from "../components/FaveButton";
import SortFilter from "../components/Filters/SortFilter";
import FavoriteFilter from "../components/Filters/FavoriteFilter";

// Types
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
  color: string;
  height: number;
  weight: number;
  favorite: favorite[];
  url: string;
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
  const [pokemon, setPokemon] = useState<PokeObject[]>([]);
  const [search, setSearch] = useState<string>("");
  const [favoritePokemonIds, setFavoritePokemonIds] = useState<number[]>([]);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedGenerations, setSelectedGenerations] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortByAsc, setSortByAsc] = useState<boolean>(true);

  const debouncedSearch = useDebouncedValue(search, 300);

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

  // Display filters on front-end
  let displayedPoke;

  if (
    selectedTypes.length ||
    selectedGenerations.length ||
    selectedColors.length
  ) {
    displayedPoke = pokemon.filter((onePoke) => {
      const typeMatch =
        selectedTypes.length === 0 ||
        onePoke.type.some((type) => selectedTypes.includes(type));
      const generationMatch =
        selectedGenerations.length === 0 ||
        selectedGenerations.includes(onePoke.generation);
      const colorMatch =
        selectedColors.length === 0 || selectedColors.includes(onePoke.color);

      return typeMatch && generationMatch && colorMatch;
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
        setSelectedColors={setSelectedColors}
      />
      <div
        className="flex flex-col gap-2 p-2 w-full overflow-y-scroll"
        // style={{ height: "calc(100vh - 99px)" }}
      >
        <div className="flex flex-col gap-2 md:flex-row justify-between items-end md:items-center">
          <div>
            <div>
              <SortFilter
                pokemon={pokemon}
                setPokemon={setPokemon}
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortByAsc={sortByAsc}
                setSortByAsc={setSortByAsc}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <FavoriteFilter
                pokemon={pokemon}
                setPokemon={setPokemon}
                fetchFilteredPokemon={fetchFilteredPokemon}
                showFavorites={showFavorites}
                setShowFavorites={setShowFavorites}
                favoritePokemonIds={favoritePokemonIds}
                setFavoritePokemonIds={setFavoritePokemonIds}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 grid-flow-row gap-2">
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
                  heartSize={2}
                />
              </div>
            </div>
          ))}
        </div>
        <p>Displayed Pokemon: {displayedPoke.length}</p>
      </div>
    </div>
  );
};

export default AllPokemon;
