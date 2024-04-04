import React, { DragEvent } from "react";
import { fetchPokeData } from "../FetchPokeData";
import { useState, useEffect } from "react";
import useTeam from "../../context/usePoke";

// import components
import pokeBall from "../../assets/empty-pokeball.png";

// declare types

import { PokeData } from "../OnePokeData";
import { PokeTypeLabel } from "../OnePokeData";
import PokeType from "../PokeType";

const TeamMember: React.FC<{
  pokeId: number;
  teamIndex: number;
  isShiny: boolean;
}> = ({ pokeId, teamIndex }) => {
  const [pokeData, setPokeData] = useState<PokeData | null>(null);
  const { removeTeamMemb, isShiny } = useTeam();

  useEffect(() => {
    fetchPokeData(pokeId, setPokeData);
  }, [pokeId]);

  // TODO create code for "loading" situation

  // TODO make element draggable

  const handleDragStart = (e: DragEvent<HTMLElement>) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(teamIndex));
  };

  return (
    <div
      className="h-full flex flex-row"
      draggable="true"
      onDragStart={handleDragStart}
    >
      <div className="group flex flex-col items-center justify-center h-80 border dark:border-slate-500 dark:bg-slate-600 rounded-xl shadow hover:shadow-lg py-5 px-4 hover:bg-blue-50  dark:hover:bg-slate-500 transition-all">
        <h1
          className={pokeId ? "font-semibold" : "font-semibold text-gray-400"}
        >
          #{teamIndex + 1}
        </h1>
        <img
          className={`pokeball h-40 w-40 rounded-full m-4 ${
            pokeId
              ? "bg-orange-100 dark:bg-slate-400 dark:group-hover:bg-slate-300 group-hover:bg-orange-200 group-hover:scale-105 "
              : "bg-gray-200 dark:bg-gray-400"
          } transition-all`}
          src={
            pokeId
              ? isShiny
                ? pokeData?.sprites.front_shiny
                : pokeData?.sprites.front_default
              : pokeBall
          }
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
          <div className="flex flex-row gap-3">
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
