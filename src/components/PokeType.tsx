interface Props {
  typeData: string;
}

const PokeType: React.FC<Props> = ({ typeData }) => {
  let style: React.CSSProperties = {};
  let textColor: string = "black";

  const typeColors: { [key: string]: string } = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };

  switch (typeData) {
    case "dark":
    case "ghost":
    case "fighting":
    case "poison":
    case "psychic":
      textColor = "white";
      break;
    default:
      textColor = "black";
      break;
  }

  if (typeData in typeColors) {
    style.backgroundColor = typeColors[typeData];
    style.color = textColor;
  } else {
    style.backgroundColor = "white";
    style.color = "black";
  }

  return (
    <div>
      <h1
        className="bg-slate-100 px-2 py-0.5 rounded-full text-xs"
        style={style}
      >
        {typeData.charAt(0).toUpperCase() + typeData.slice(1)}
      </h1>
    </div>
  );
};

export default PokeType;
