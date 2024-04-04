import { useEffect } from "react";
import backendApi from "../../service/backendApi";

type Props = {
  pokemon: any[];
  setPokemon: Function;
  fetchFilteredPokemon: Function;
  showFavorites: boolean;
  setShowFavorites: Function;
  favoritePokemonIds: any[];
  setFavoritePokemonIds: Function;
};

const FilterFavorites: React.FC<Props> = ({
  pokemon,
  setPokemon,
  fetchFilteredPokemon,
  showFavorites,
  setShowFavorites,
  favoritePokemonIds,
  setFavoritePokemonIds,
}) => {
  // Fetch favorite Pokemon IDs
  const fetchFavoritePokemonIds = async () => {
    try {
      const { data } = await backendApi.get("/favorite");
      setFavoritePokemonIds(data.map((favorite: any) => favorite.pokemonId));
    } catch (error) {
      console.log(error);
    }
  };

  // Filter by favorites
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

  return (
    <button
      onClick={filterByFavorites}
      className="transition-all bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-full sticky font-press-start text-xs"
    >
      {showFavorites ? "Show all" : "Show favorites"}
    </button>
  );
};

export default FilterFavorites;
