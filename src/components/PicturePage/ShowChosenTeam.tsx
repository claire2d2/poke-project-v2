import React, { useState, useEffect } from "react";
import backendApi from "../../service/backendApi";
import SmallSprite from "../TeamPage/SmallSprite";

type pokeTeam = {
  name: string;
  isShiny: boolean;
  members: Array<number>;
  id: number;
};
const ShowChosenTeam: React.FC<{
  chosenTeam: number;
}> = ({ chosenTeam }) => {
  const [team, setTeam] = useState<pokeTeam | null>(null);

  async function fetchTeamData() {
    try {
      const response = await backendApi.get(`/teams/${chosenTeam}`);
      setTeam(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTeamData();
  }, [chosenTeam]);
  if (!team) {
    return 0;
  }

  return (
    <div className="text-xl flex flex-col gap-4">
      You chose <span className="font-semibold text-2xl">{team.name}</span>
      <div className="flex flex-wrap justify-center items-center mx-auto ">
        {team.members.map((member) => {
          return (
            <div className="basis-1/2 flex justify-center">
              <SmallSprite pokeId={member} shinyState={team.isShiny} />
            </div>
          );
        })}
      </div>
      <p>You're almost there!</p>
    </div>
  );
};

export default ShowChosenTeam;
