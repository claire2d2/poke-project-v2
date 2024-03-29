import { useState, useEffect } from "react";
import axios from "axios";

type pokeObject = {
  name: string;
  url: string;
  favorite: boolean;
};

const FaveButton: React.FC<{ pokeId: number }> = ({ pokeId }) => {
  // testing style

  // testing to implement the favorite
  const [currentPoke, setCurrentPoke] = useState<pokeObject>({
    name: "",
    url: "",
    favorite: false,
  });
  const [isFave, setIsFave] = useState<boolean | null>(null);

  // creating favorites in the concerned pokemon
  async function fetchCurrentPoke() {
    try {
      const { data } = await axios.get(
        `https://poke-backend.adaptable.app/favorite/${pokeId}`
      );
      console.log(data);
      if (data) {
        setIsFave(true);
      } else {
        setIsFave(false);
      }
    } catch (error) {
      console.log(error);
      setIsFave(false);
    }
  }

  useEffect(() => {
    fetchCurrentPoke();
    console.log(isFave);
  }, []);

  // handle make the current pokemon favorite

  async function handleFavorite(e) {
    e.preventDefault();
    console.log("button clickie thingie");
    if (!isFave) {
      console.log("test make fave on click");
      makeFavorite();
    } else {
      deleteFavorite();
    }
  }

  async function makeFavorite() {
    try {
      const response = await axios.post(
        `https://poke-backend.adaptable.app/favorite`,
        { id: pokeId, pokeId: pokeId }
      );
      console.log("I have added a fave");
      console.log(response);
      setIsFave(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteFavorite() {
    try {
      const response = await axios.delete(
        `https://poke-backend.adaptable.app/favorite/${pokeId}`
      );
      console.log("I have deleted a fave");
      console.log(response);
      setIsFave(false);
    } catch (error) {
      console.log(error);
    }
  }
  const buttonStyle = isFave ? "text-green-700" : "text-red-700";
  //
  return (
    <button onClick={handleFavorite} className={buttonStyle}>
      make {currentPoke.name} fave
    </button>
  );
};
export default FaveButton;
