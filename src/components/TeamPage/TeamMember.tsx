import React from "react";
import { fetchPokeData } from "../FetchPokeData";
import { useState, useEffect } from "react";
import useTeam from "../../context/usePoke";

// import components
import pokeBall from "../../assets/empty-pokeball.png";

// declare types

import { PokeData } from "../OnePokeData";
import { PokeTypeLabel } from "../OnePokeData";
import PokeType from "../PokeType";

const TeamMember: React.FC<{ pokeId: number; teamIndex: number }> = ({
  pokeId,
  teamIndex,
}) => {
  const [pokeData, setPokeData] = useState<PokeData | null>(null);
  const { removeTeamMemb } = useTeam();

  useEffect(() => {
    fetchPokeData(pokeId);
  }, [pokeId]);

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
          {/* show pokemon name or "No Pokemon yet" if request has failed */}
          {pokeId ? (
            pokeData?.species.name
          ) : (
            <span className="text-gray-400">No Pokemon Yet</span>
          )}
        </h2>
        {pokeId ? (
          <div className="flex flex-row gap-1">
            {pokeData?.types.map((el: PokeTypeLabel) => {
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
          onClick={() => removeTeamMemb(teamIndex)}
          className="m-1 px-2 py-1 text-xs font-medium text-center text-white bg-red-500 rounded-xl hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 disabled:bg-gray-200"
        >
          remove
        </button>
      </div>
    </div>
  );
};

export default TeamMember;
