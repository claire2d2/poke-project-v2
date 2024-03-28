import { useEffect, useState } from "react";
import pokeApi from "../service/pokeApi";

type SpriteData = {
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
};

type TypesData = {
  type: { name: string };
};

type PokeData = {
  name: string;
  sprites: SpriteData;
  types: TypesData[];
};

const PokeCard: React.FC<{ pokeName: string }> = ({ pokeName }) => {
  const [pokeData, setPokeData] = useState<PokeData | null>(null);

  async function fetchPokeImage(name: string) {
    try {
      const { data } = await pokeApi.get<PokeData>(`/pokemon/${name}`);
      setPokeData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPokeImage(pokeName);
  }, [pokeName]);

  if (!pokeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col align-center justify-center">
      <img
        src={pokeData.sprites.other["official-artwork"].front_default}
        alt=""
      />
      <div className="flex gap-2">
        {pokeData.types && pokeData.types.length > 0 ? (
          pokeData.types.map((typeData, index) => (
            <span key={index}>{typeData.type.name}</span>
          ))
        ) : (
          <p>No types</p>
        )}
      </div>
    </div>
  );
};

export default PokeCard;
