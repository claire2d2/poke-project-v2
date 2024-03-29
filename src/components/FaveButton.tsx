import { useState, useEffect } from "react";
import axios from "axios";

type pokeObject = {
  name: string;
  url: string;
  favorite: Array<pokeFave> | null;
};

type pokeFave = { pokemonId: number; id: number };

const FaveButton: React.FC<{ pokeId: number }> = ({ pokeId }) => {
  // testing style

  // state for pokemon data
  const [currentPoke, setCurrentPoke] = useState<pokeObject>({
    name: "",
    url: "",
    favorite: [],
  });

  // state to determine if pokemon is fave or not
  const [isFave, setIsFave] = useState<boolean | null>(null);

  // state to determine if there is data that is being fetched

  const [isFetchingData, setIfFetchingData] = useState<boolean>(false);

  // creating favorites in the concerned pokemon
  async function fetchCurrentPoke() {
    try {
      setIfFetchingData(true);
      const { data } = await axios.get(
        `https://poke-backend.adaptable.app/pokemons/${pokeId}?_embed=favorite`
      );
      setIfFetchingData(false);
      if (data.favorite.length > 0) {
        setCurrentPoke(data);
        setIsFave(true);
      } else {
        setIsFave(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCurrentPoke();
  }, [pokeId]);

  // handle make the current pokemon favorite

  async function handleFavorite(e) {
    e.preventDefault();
    console.log("button clickie thingie");
    if (!isFave) {
      console.log("test make fave on click");
      makeFavorite();
      setIsFave(true);
    } else {
      console.log("going to make this a fave");
      deleteFavorite();
      setIsFave(false);
    }
  }

  async function makeFavorite() {
    try {
      setIfFetchingData(true);
      const response = await axios.post(
        `https://poke-backend.adaptable.app/favorite`,
        { pokemonId: pokeId }
      );
      console.log("I have added a fave");
      console.log(response);
      console.log("fave status after making fave:", isFave);
      setIfFetchingData(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteFavorite() {
    try {
      setIfFetchingData(true);
      // Find the index of the favorite object with the matching pokemonId
      const idToDelete: number = currentPoke.favorite[0].id;

      // Make delete request to delete the favorite
      const response = await axios.delete(
        `https://poke-backend.adaptable.app/favorite/${idToDelete}`
      );
      console.log("I have deleted a fave");
      console.log(response);
      setIfFetchingData(false);
    } catch (error) {
      console.log(error);
    }
  }
  const buttonStyle = isFave ? "text-green-700" : "text-red-700";

  return (
    <button
      disabled={isFetchingData ? true : false}
      onClick={handleFavorite}
      className={buttonStyle}
    >
      make {currentPoke.name} fave
    </button>
  );
};
export default FaveButton;
