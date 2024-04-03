import { useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import backendApi from "../service/backendApi";

// import components useful for the page
import { PokeAttr } from "../components/OnePokePage/OnePokeStyle";
import PokeType from "../components/PokeType";
import FaveButton from "../components/FaveButton";
import { PokeData } from "../components/OnePokeData";
import { PokeDexData } from "../components/OnePokePage/PokeDexData";
import OutsidePerim from "../components/OnePokePage/OutsidePerim";
import LoadingPage from "../components/OnePokePage/LoadingPage";
import addTeam from "../context/usePoke";
import { fetchPokeData, fetchPokeDexData } from "../components/FetchPokeData";
import { showDexEntry } from "../components/OnePokePage/ShowPokeDexFunc";

// nav buttons on the bottom of the page
import NavButton from "../components/OnePokePage/NavButton";

// styling for the page
const titleStyle = "text-4xl text-center font-extrabold text-yellow-400";
const subTitleStyle =
  "text-2xl p-1 text-blue-900 font-semibold hover:text-blue-700";

// Type
type favorite = {
  pokemonId: number;
  id: number;
};
type PokeObject = {
  id: number;
  name: string;
  image: string;
  type: string[];
  favorite: favorite[];
};

const OnePoke = () => {
  // use state to get the wanted pokemon from the pokemonlist? state
  const [pokeData, setPokeData] = useState<PokeData | null>(null);
  const [pokeStatus, setPokeStatus] = useState<PokeObject | null>(null);

  // use state to change the game for pokedex section
  const [pokeGame, setPokeGame] = useState<string>("default");
  const [dexDescr, setDexDescr] = useState<string>(
    "Please choose a game to see the corresponding PokeDex entry!"
  );
  const [gameSprite, setGameSprite] = useState<string>("");

  // use state to get data from the pokemon species
  const [pokeSpecies, setPokeSpecies] = useState<PokeDexData | null>(null);

  // get the pokemon name from the url
  const { pokeId } = useParams<string>();

  // fetch the pokemon data using pokeApi
  useEffect(() => {
    fetchPokeData(Number(pokeId), setPokeData);
    fetchPokeDexData(Number(pokeId), setPokeSpecies);
    checkPokeStatus(Number(pokeId));
  }, [pokeId]);

  // import context for adding the current pokemon to the current team
  const { addTeamMemb, teamFull, removeTeamMemb } = addTeam();

  // handle add success, team is full messages
  const [msgTeamFull, setMsgTeamFull] = useState<boolean>(false);
  const [addSuccess, setAddSuccess] = useState<boolean>(false);
  const [undoAdd, setUndoAdd] = useState<boolean>(false);

  // when button is clicked, add pokémon to team if team isn't full yet
  const handleAddPoke = () => {
    if (teamFull) {
      setAddSuccess(false);
      setMsgTeamFull(true);
      return 1;
    }
    setUndoAdd(false);
    setAddSuccess(true);
    addTeamMemb(Number(pokeId));
  };

  const handleRemovePoke = () => {
    removeTeamMemb(Number(pokeId));
    setUndoAdd(true);
    setAddSuccess(false);
  };

  // erase team is full message after 2.5 seconds
  useEffect(() => {
    setTimeout(() => {
      setMsgTeamFull(false);
    }, 2500);
  }, [msgTeamFull]);

  // show add message of team member temporarily
  useEffect(() => {
    setTimeout(() => {
      setAddSuccess(false);
    }, 4000);
  }, [undoAdd]);

  const handleGameChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // sets the game
    const selectedGame = e.target.value;
    setPokeGame(selectedGame);
    // sets the sprite depending on the game
  };

  useEffect(() => {
    if (pokeData !== null && pokeSpecies !== null) {
      showDexEntry(pokeGame, setGameSprite, setDexDescr, pokeData, pokeSpecies);
    }
  }, [pokeGame, pokeData, pokeSpecies]);

  // if pokemon outside of gen 1-3, return
  if (Number(pokeId) > 386 && Number(pokeId) < 1026) {
    return <OutsidePerim />;
  }

  // see if pokemon has a favorite or not
  async function checkPokeStatus(pokeId: number) {
    try {
      const response = await backendApi.get<PokeObject>(
        `pokemons/${pokeId}?_embed=favorite`
      );
      setPokeStatus(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // If the pokemon does not exist or data is still loading
  if (!pokeData && !pokeSpecies && !pokeStatus) {
    return <LoadingPage />;
  }

  // make games option array
  let gamesArray: Array<string> = [];
  // if trying to look at pokemon other than gen-1 to gen-3
  if (Number(pokeId) > 386) {
    return <OutsidePerim />;
  } else if (Number(pokeId) > 251) {
    gamesArray = ["default", "ruby", "sapphire", "emerald"];
  } else if (Number(pokeId) > 151 && pokeData !== null && pokeData.id < 252) {
    gamesArray = [
      "default",
      "silver",
      "gold",
      "crystal",
      "ruby",
      "sapphire",
      "emerald",
    ];
  } else {
    gamesArray = [
      "default",
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
            src={pokeData?.sprites.other["official-artwork"].front_default}
            alt={`official artwork  of ${pokeData?.species.name}`}
          />
        </div>
        <div className="rightSide flex flex-col h-full basis-3/5 border-solid border border-gray-100">
          {/* Describe here the physical charact of the pokemon */}
          <div className="flex justify-between">
            <h2 className={subTitleStyle}>Physical characteristics</h2>
            {pokeStatus?.favorite.length}
            <FaveButton
              isFave={
                pokeStatus !== null ? pokeStatus.favorite?.length > 0 : false
              }
              currPoke={pokeStatus}
              heartSize={4}
            />
          </div>
          <div className="p-1">
            <PokeAttr title="Height">
              {pokeData !== null ? pokeData?.height * 10 : "data loading"} cm
            </PokeAttr>
            <PokeAttr title="Weight">
              {pokeData !== null ? pokeData?.weight / 10 : "data loading"} kg
            </PokeAttr>
            <PokeAttr title="Types">
              {pokeData?.types.map((pokeType) => {
                return (
                  <span
                    className="basis-1/6 text-center text-sm mx-1"
                    key={pokeType.type.name}
                  >
                    <PokeType typeData={pokeType.type.name} />
                  </span>
                );
              })}
            </PokeAttr>
            <PokeAttr title="Cry">
              <audio className="" controls>
                <source
                  src={pokeData !== null ? pokeData.cries.latest : ""}
                  type="audio/ogg"
                />
              </audio>
            </PokeAttr>
          </div>
          {/* Here the customisable data */}
          <div className="pokeDex">
            <div className="flex justify-between">
              <h2 className={subTitleStyle}>PokeDex Entry</h2>
              <PokeAttr title="Game">
                <select onChange={handleGameChange} id="gameChange">
                  {gamesArray.map((game) => {
                    return (
                      <option className="capitalize" value={game}>
                        {game}
                      </option>
                    );
                  })}
                </select>
              </PokeAttr>
            </div>

            <div className="flex m-2 p-2 gap-2 border-8 border-double border-gray-100">
              <img
                className="basis-1/6 object-scale-down"
                src={
                  pokeGame === "default"
                    ? pokeData?.sprites.front_default
                    : gameSprite
                }
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
                <PokeAttr title="Pokedex Description">
                  <p>{dexDescr}</p>
                </PokeAttr>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between px-10">
        <NavButton disabled={false} color="blue" navTo="/pokemon">
          All Pokémon
        </NavButton>
        <div className="flex gap-10">
          <NavButton
            disabled={pokeData?.id === 1 ? true : false}
            color="orange"
            navTo={`/pokemon/${Number(pokeId) - 1}`}
          >
            Prev
          </NavButton>
          <NavButton
            disabled={pokeData?.id === 386 ? true : false}
            color="orange"
            navTo={`/pokemon/${Number(pokeId) + 1}`}
          >
            Next
          </NavButton>
        </div>

        <div className="relative">
          <button
            onClick={() => handleAddPoke()}
            className="mx-3 bg-yellow-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-600 hover:border-blue-500 rounded"
          >
            Add Pokemon to my team
          </button>
          <p className="absolute text-center text-sm text-red-500 inset-x-1/4">
            {msgTeamFull ? "Your team is full!" : ""}
          </p>
          <p className="absolute text-center text-sm text-gray-600 inset-x-10">
            {addSuccess ? (
              <div className="flex w-full">
                <div>Added successfully! </div>
                <button
                  className="underline underline-offset-1"
                  onClick={() => {
                    handleRemovePoke();
                  }}
                >
                  Undo
                </button>
              </div>
            ) : (
              ""
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnePoke;
