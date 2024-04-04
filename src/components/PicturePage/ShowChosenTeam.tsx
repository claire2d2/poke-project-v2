import React, { useState, useEffect } from "react";
import SmallSprite from "../TeamPage/SmallSprite";

import { pokeTeam } from "../TeamData";
import { fetchOneTeam } from "../TeamData";

const ShowChosenTeam: React.FC<{
  chosenTeam: number;
}> = ({ chosenTeam }) => {
  const [team, setTeam] = useState<pokeTeam | null>(null);

  useEffect(() => {
    fetchOneTeam(chosenTeam, setTeam);
  }, [chosenTeam]);
  if (!team) {
    return 0;
  }

  return (
    <div className="text-xl flex flex-col gap-4">
      You chose{" "}
      <span className="font-semibold text-3xl text-red-500">{team.name}</span>
      <div className="flex flex-wrap justify-center items-center mx-auto ">
        {team.members.map((member) => {
          return (
            <div className="basis-1/2 flex justify-center scale-150">
              <SmallSprite pokeId={member} shinyState={team.isShiny} />
            </div>
          );
        })}
      </div>
      <p className="text-xl">You're almost there!</p>
    </div>
  );
};

export default ShowChosenTeam;
