import PokeType from "./PokeType";

type PokeObject = {
  id: number;
  name: string;
  image: string;
  type: string[];
};

type PokeCardProps = {
  pokeData: PokeObject;
};

const PokeCard: React.FC<PokeCardProps> = ({ pokeData }) => {
  return (
    <div className="flex flex-col align-center justify-center items-center gap-2">
      <img src={pokeData.image} alt={pokeData.name} />
      <h1 className="text-center text-lg font-medium">
        {pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1)}
      </h1>
      <div className="flex flex-wrap gap-3 justify-center">
        {pokeData.type && pokeData.type.length > 0 ? (
          pokeData.type.map((typeData, index) => (
            <PokeType key={index} typeData={typeData} />
          ))
        ) : (
          <p>No types</p>
        )}
      </div>
    </div>
  );
};

export default PokeCard;
