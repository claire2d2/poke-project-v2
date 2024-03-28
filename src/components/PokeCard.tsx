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

  async function fetchPokeImage() {
    try {
      const { data } = await pokeApi.get<PokeData>(`/pokemon/${pokeName}`);
      setPokeData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPokeImage();
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
      <div className="flex gap-3 justify-center">
        {pokeData.types && pokeData.types.length > 0 ? (
          pokeData.types.map((typeData, index) => (
            <p key={index} className="bg-slate-100 px-2 py-0.5 rounded-full">
              {typeData.type.name}
            </p>
          ))
        ) : (
          <p>No types</p>
        )}
      </div>
    </div>
  );
};

export default PokeCard;
