import { useState, useEffect } from "react";
import pokeApi from "../../service/pokeApi";

type PokePoser = {
  id: number;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
        front_shiny: string;
      };
    };
  };
};

const PokePoser: React.FC<{ pokeId: number; isShiny: boolean }> = ({
  pokeId,
  isShiny,
}) => {
  const [poke, setPoke] = useState<PokePoser | null>(null);

  async function fetchPokeImage() {
    try {
      const response = await pokeApi.get<PokePoser>(`/pokemon/${pokeId}`);
      setPoke(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPokeImage();
  }, [pokeId]);

  if (!poke) {
    return <div>Loading ...</div>;
  }
  return (
    <div>
      <img
        src={
          isShiny
            ? poke?.sprites.other["official-artwork"].front_default
            : poke?.sprites.other["official-artwork"].front_default
        }
        alt=""
      />
    </div>
  );
};

export default PokePoser;
