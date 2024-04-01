import React from "react";
import pokeApi from "../../service/pokeApi";
import { useState, useEffect } from "react";
import useTeam from "../../context/usePoke";

// import components
import PokeType from "../PokeType";
import pokeBall from "../../assets/empty-pokeball.png";

// declare types

type pokeObject = {
  species: { name: string };
  sprites: { front_default: string };
  types: Array<pokeTypes>;
};

type pokeTypes = {
  type: { name: string };
};

const TeamMember: React.FC<{ pokeId: number; teamIndex: number }> = ({
  pokeId,
  teamIndex,
}) => {
  const [pokeData, setPokeData] = useState<pokeObject | null>(null);
  const { currTeam, setCurrTeam, setTeamFull } = useTeam();

  async function fetchPokeData() {
    try {
      const response = await pokeApi.get<pokeObject>(`/pokemon/${pokeId}`);
      setPokeData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPokeData();
  }, [pokeId]);

  // function to delete pokemon from current teams
  const removePoke = () => {
    const copy = [...currTeam];
    copy.splice(teamIndex, 1);
    setCurrTeam(copy);
  };

  // TODO create code for "loading" situation

  return (
    <div className="h-full flex flex-row">
      <div className="group flex flex-col items-center justify-center max-w-60  border-gray-300 rounded-xl shadow hover:shadow-lg p-4 hover:bg-blue-50  hover:border transition-all">
        <h1
          className={pokeId ? "font-semibold" : "font-semibold text-gray-400"}
        >
          #{teamIndex + 1}
        </h1>
        <img
          className={`pokeball h-40 w-40 rounded-full m-4 ${
            pokeId
              ? "bg-orange-100 group-hover:bg-orange-200 group-hover:scale-105 "
              : "bg-gray-200"
          } transition-all`}
          src={pokeId ? pokeData?.sprites.front_default : pokeBall}
          alt="pokeball"
        />
        <h2 className="capitalize text-xl font-semibold my-2 group-hover:text-orange-500  transition-all">
          {pokeId ? (
            pokeData?.species.name
          ) : (
            <span className="text-gray-400">No Pokemon Yet</span>
          )}
        </h2>
        {pokeId ? (
          <div className="flex flex-row gap-1">
            {pokeData?.types.map((el: pokeTypes) => {
              return (
                <span className="scale-125 m-1" key={el.type.name}>
                  <PokeType typeData={el.type.name} />
                </span>
              );
            })}
          </div>
        ) : (
          <span className="text-gray-200"> ...</span>
        )}
        <button
          disabled={pokeId ? false : true}
          onClick={() => removePoke()}
          className="m-1 px-2 py-1 text-xs font-medium text-center text-white bg-red-500 rounded-xl hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 disabled:bg-gray-200"
        >
          remove
        </button>
      </div>
    </div>
  );
};

export default TeamMember;
