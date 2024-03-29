import { useState, useEffect } from "react";
import axios from "axios";

// import images for the button
import faveButtonImg from "../assets/favorited_button.png";
import unFaveButtonImg from "../assets/unfavorited_button.png";

type pokeObject = {
  name: string;
  url: string;
  favorite: Array<pokeFave> | null;
};

type pokeFave = { pokemonId: number; id: number };

const FaveButton: React.FC<{ pokeId: number; heartSize: number }> = ({
  pokeId,
  heartSize,
}) => {
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
      const { data } = await axios.get(
        `https://poke-backend.adaptable.app/pokemons/${pokeId}?_embed=favorite`
      );
      setCurrentPoke(data);
      if (data.favorite.length === 1) {
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
    if (!isFave) {
      makeFavorite();
      setIsFave(true);
    } else {
      deleteFavorite();
      setIsFave(false);
    }
  }

  async function makeFavorite() {
    try {
      const response = await axios.post(
        `https://poke-backend.adaptable.app/favorite`,
        { pokemonId: pokeId }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteFavorite() {
    try {
      // Find the index of the favorite object with the matching pokemonId
      const idToDelete: number = currentPoke.favorite[0].id;

      // Make delete request to delete the favorite
      const response = await axios.delete(
        `https://poke-backend.adaptable.app/favorite/${idToDelete}`
      );
      console.log("I have deleted a fave");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="Favorite flex">
      <button onClick={handleFavorite} className={`h-${heartSize} flex`}>
        <img
          className="object-scale-down h-full"
          src={isFave ? faveButtonImg : unFaveButtonImg}
          alt="favorite button"
        />
      </button>
    </div>
  );
};
export default FaveButton;
