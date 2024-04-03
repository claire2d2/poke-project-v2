import React, { useState, useEffect } from "react";
import PokePoser from "./PokePoser";

import backendApi from "../../service/backendApi";

type pokeTeam = {
  name: string;
  isShiny: boolean;
  members: Array<number>;
  id: number;
};

const FinalPicture: React.FC<{
  chosenTrainer: string;
  pokeTeamId: number;
  chosenImg: string;
  closeModal: () => void;
}> = ({ chosenTrainer, pokeTeamId, chosenImg }) => {
  const [team, setTeam] = useState<pokeTeam | null>(null);
  async function fetchTeamData() {
    try {
      const response = await backendApi.get(`/teams/${pokeTeamId}`);
      setTeam(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTeamData();
  }, [pokeTeamId]);

  if (!team) {
    return <div>Loading picture ...</div>;
  }
  return (
    <div className="p-2">
      <div className="Picture relative overflow-hidden h-full w-full mt-3 mx-5">
        <img src={chosenImg} alt="background image" className="object-cover" />
        <div className="pokemon absolute top-0 left-0 scale-50">
          <PokePoser pokeId={team.members[0]} />
        </div>
        <div className="pokemon absolute top-0 left-20 scale-50">
          <PokePoser pokeId={team.members[1]} />
        </div>
        <div className="pokemon absolute top-0 left-40 scale-50">
          <PokePoser pokeId={team.members[2]} />
        </div>
        <div className="pokemon absolute top-0 left-60 scale-50">
          <PokePoser pokeId={team.members[3]} />
        </div>
        <div className="pokemon absolute top-0 -right-0 scale-50">
          <PokePoser pokeId={team.members[4]} />
        </div>
        <div className="pokemon absolute top-0 -right-20 scale-50">
          <PokePoser pokeId={team.members[5]} />
        </div>
        <div className="trainer">
          <img
            src={chosenTrainer}
            alt="trainer"
            className="absolute -bottom-40 h-full scale-150"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center p-4">
        <h3 className="text-2xl font-bold text-center">Wonderful!</h3>
        <p>Do you want to save your picture?</p>
        <button>Take another picture</button>
      </div>
    </div>
  );
};

export default FinalPicture;
