import { useState, useEffect, ChangeEventHandler } from "react";
import { useParams, useNavigate } from "react-router-dom";
import pokeApi from "../service/pokeApi";

// import components useful for the page
import { PokeAttr } from "../components/OnePokePage/OnePokeStyle";
import PokeType from "../components/PokeType";
import FaveButton from "../components/FaveButton";
import { PokeData } from "../components/OnePokePage/OnePokeData";
import { PokeDexData } from "../components/OnePokePage/PokeDexData";
import OutsidePerim from "../components/OnePokePage/OutsidePerim";
import LoadingPage from "../components/OnePokePage/LoadingPage";
import addTeam from "../context/usePoke";

// styling for the page
const titleStyle = "text-4xl text-center font-extrabold text-yellow-400";
const subTitleStyle =
  "text-2xl p-1 text-blue-900 font-semibold hover:text-blue-700";

const OnePoke = () => {
  // declare navigate function
  const navigate = useNavigate();

  // use state to get the wanted pokemon from the pokemonlist? state
  const [pokeData, setPokeData] = useState<PokeData | null>(null);

  // use state to change the game for pokedex section
  const [pokeGame, setPokeGame] = useState<string | null>(null);

  // use state to get data from the pokemon species
  const [pokeSpecies, setPokeSpecies] = useState<PokeDexData | null>(null);

  // import context for adding the current pokemon to the current team
  const { currTeam, setCurrTeam } = addTeam();
  const [teamFull, setTeamFull] = useState<boolean>(false);

  //TODO show message when added succesfully!
  function addTeamMemb() {
    if (currTeam.length > 5) {
      setTeamFull(true);
      return 1;
    }
    setCurrTeam([...currTeam, pokeData.id]);
    return 1;
  }

  // show error message of full team only temporarily
  useEffect(() => {
    const intervalId = setTimeout(() => {
      setTeamFull(false);
    }, 2500);
  }, [teamFull]);

  const handleGameChange = (e: ChangeEventHandler<HTMLSelectElement>) => {
    // sets the game
    setPokeGame(e.target.value);
    // sets the sprite depending on the game
  };

  let dexDescr: string =
    "Please choose a game to see the corresponding PokeDex entry!";
  let gameSprite: string = pokeData?.sprites.front_default;
  switch (pokeGame) {
    case "red-blue": {
      gameSprite =
        pokeData?.sprites.versions["generation-i"]["red-blue"].front_default;
      const copy = pokeSpecies?.flavor_text_entries.filter(
        (entry) => entry.language.name === "en" && entry.version.name === "red"
      );
      dexDescr = copy[0].flavor_text;
      break;
    }
    case "yellow": {
      gameSprite =
        pokeData?.sprites.versions["generation-i"].yellow.front_default;
      const copy = pokeSpecies?.flavor_text_entries.filter(
        (entry) =>
          entry.language.name === "en" && entry.version.name === "yellow"
      );
      dexDescr = copy[0].flavor_text;
      break;
    }
    case "silver": {
      gameSprite =
        pokeData?.sprites.versions["generation-ii"].silver.front_default;
      const copy = pokeSpecies?.flavor_text_entries.filter(
        (entry) =>
          entry.language.name === "en" && entry.version.name === "silver"
      );
      dexDescr = copy[0].flavor_text;
      break;
    }
    case "gold": {
      gameSprite =
        pokeData?.sprites.versions["generation-ii"].gold.front_default;
      const copy = pokeSpecies?.flavor_text_entries.filter(
        (entry) => entry.language.name === "en" && entry.version.name === "gold"
      );
      dexDescr = copy[0].flavor_text;
      break;
    }
    case "crystal": {
      gameSprite =
        pokeData?.sprites.versions["generation-ii"].crystal.front_default;
      const copy = pokeSpecies?.flavor_text_entries.filter(
        (entry) =>
          entry.language.name === "en" && entry.version.name === "crystal"
      );
      dexDescr = copy[0].flavor_text;
      break;
    }
    case "ruby": {
      pokeData?.sprites.versions["generation-iii"]["ruby-sapphire"]
        .front_default;
      const copy = pokeSpecies?.flavor_text_entries.filter(
        (entry) => entry.language.name === "en" && entry.version.name === "ruby"
      );
      dexDescr = copy[0].flavor_text;
      break;
    }
    case "sapphire": {
      gameSprite =
        pokeData?.sprites.versions["generation-iii"]["ruby-sapphire"]
          .front_default;
      const copy = pokeSpecies?.flavor_text_entries.filter(
        (entry) =>
          entry.language.name === "en" && entry.version.name === "sapphire"
      );
      dexDescr = copy[0].flavor_text;
      break;
    }
    case "emerald": {
      gameSprite =
        pokeData?.sprites.versions["generation-iii"].emerald.front_default;
      const copy = pokeSpecies?.flavor_text_entries.filter(
        (entry) =>
          entry.language.name === "en" && entry.version.name === "emerald"
      );
      dexDescr = copy[0].flavor_text;
      break;
    }
  }

  // get the pokemon name from the url
  const { pokeId } = useParams<number>();

  // if pokemon outside of gen 1-3, return
  if (pokeId > 386 && pokeId < 1026) {
    return <OutsidePerim />;
  }

  // fetch the pokemon using pokeApi
  async function fetchPokeData() {
    try {
      const response = await pokeApi.get<PokeData>(`/pokemon/${pokeId}`);
      setPokeData(response.data);
      const pokedex = await pokeApi.get<PokeDexData>(
        `/pokemon-species/${pokeId}`
      );
      setPokeSpecies(pokedex.data);
    } catch (e) {
      console.log(e);
    }
  }

  // use effect to launch the fetch function once mounted
  useEffect(() => {
    fetchPokeData();
  }, [pokeId]);

  // If the pokemon does not exist or data is still loading
  if (!pokeData && !pokeSpecies) {
    return <LoadingPage />;
  }

  // make games option array
  let gamesArray: Array<string> = [];
  // if trying to look at pokemon other than gen-1 to gen-3
  if (pokeData.id > 386) {
    return <OutsidePerim />;
  } else if (pokeData.id > 251) {
    gamesArray = ["ruby", "sapphire", "emerald"];
  } else if (pokeData.id > 151 && pokeData.id < 252) {
    gamesArray = ["silver", "gold", "crystal", "ruby", "sapphire", "emerald"];
  } else {
    gamesArray = [
      "red-blue",
      "yellow",
      "silver",
      "gold",
      "crystal",
      "ruby",
      "sapphire",
      "emerald",
    ];
  }
  return (
    <div className="p-8 flex flex-col">
      <h1 className={`${titleStyle} capitalize`}>{pokeData?.species.name}</h1>
      <div className="cardCenter h-4/5 flex flex-col items-center gap-5 py-5 px-10 md:flex-row ">
        <div className="leftSide basis-2/5 shadow-lg h-full">
          <img
            className="mx-auto h-full"
            src={pokeData.sprites.other["official-artwork"].front_default}
            alt={`official artwork  of ${pokeData.species.name}`}
          />
        </div>
        <div className="rightSide flex flex-col h-full basis-3/5 border-solid border border-gray-100">
          {/* Describe here the physical charact of the pokemon */}
          <div className="flex justify-between">
            <h2 className={subTitleStyle}>Physical characteristics</h2>
            <FaveButton pokeId={pokeData.id} heartSize={4} />
          </div>
          <div className="p-1">
            <PokeAttr title="Height"> {pokeData.height * 10} cm</PokeAttr>
            <PokeAttr title="Weight"> {pokeData.weight / 10} kg</PokeAttr>
            <PokeAttr title="Types">
              {pokeData.types.map((pokeType) => {
                return (
                  <span
                    className="basis-1/6 text-center text-sm mx-1"
                    key={pokeType.type.name}
                  >
                    {" "}
                    <PokeType typeData={pokeType.type.name} />
                  </span>
                );
              })}
            </PokeAttr>
            <PokeAttr title="Cry">
              <audio className="" controls>
                <source src={pokeData.cries.latest} type="audio/ogg" />
              </audio>
            </PokeAttr>
          </div>
          {/* Here the customisable data */}
          <div className="pokeDex">
            <div className="flex justify-between">
              <h2 className={subTitleStyle}>PokeDex Entry</h2>
              <PokeAttr title="Game">
                <select onChange={handleGameChange} id="gameChange">
                  <option value={null}>Default</option>
                  {gamesArray.map((game) => {
                    return <option value={game}>{game}</option>;
                  })}
                </select>
              </PokeAttr>
            </div>

            <div className="flex m-2 p-2 gap-2 border-8 border-double border-gray-100">
              <img
                className="basis-1/6 object-scale-down"
                src={gameSprite}
                alt="sprite of pokemon"
              />

              <div className="mx-auto p-5 basis-4/6 font-press-start text-xs">
                <PokeAttr title="Genus">
                  {pokeSpecies?.genera[7].genus}
                </PokeAttr>
                <PokeAttr title="Habitat">
                  <span className="capitalize">
                    {pokeSpecies?.habitat.name}
                  </span>
                </PokeAttr>
                <PokeAttr title="Pokedex Description" />
                <p>{dexDescr}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between px-10">
        <button
          onClick={() => navigate("/pokemon")}
          className="mx-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Back
        </button>
        <div className="flex gap-10">
          <button
            disabled={pokeData.id === 1 ? true : false}
            className="transition-all bg-orange-500 hover:bg-rose-500 text-white  font-bold py-2 px-4 rounded-full disabled:bg-gray-300"
            onClick={() => navigate(`/pokemon/${pokeData.id - 1}`)}
          >
            Prev
          </button>
          <button
            disabled={pokeData.id === 386 ? true : false}
            className="transition-all bg-orange-500 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-300"
            onClick={() => navigate(`/pokemon/${pokeData.id + 1}`)}
          >
            Next
          </button>
        </div>

        <div className="relative">
          <button
            onClick={() => addTeamMemb(pokeData.id)}
            className="mx-3 bg-yellow-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-600 hover:border-blue-500 rounded"
          >
            Add Pokemon to my team
          </button>
          <p className="absolute text-center text-sm text-red-500 inset-x-1/4">
            {teamFull ? "Your team is full!" : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnePoke;
