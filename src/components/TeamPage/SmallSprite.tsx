import pokeApi from "../../service/pokeApi";
import { useState, useEffect } from "react";
import { PokeData } from "../../components/OnePokeData";

const SmallSprite: React.FC<{ pokeId: number }> = ({ pokeId }) => {
  const [pokeData, setPokeData] = useState<PokeData | null>(null);

  async function fetchPokeImage() {
    try {
      const { data } = await pokeApi.get<PokeData>(`/pokemon/${pokeId}`);
      setPokeData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPokeImage();
  }, [pokeId]);

  if (!pokeData) {
    return <span>Loading...</span>;
  }

  return (
    <span>
      <img
        src={pokeData?.sprites.front_default}
        alt={`sprite of ${pokeData?.species.name}`}
      />
    </span>
  );
};

export default SmallSprite;
