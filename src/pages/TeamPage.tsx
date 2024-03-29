import { useState } from "react";

import TeamMember from "../components/TeamMember";
import CreateTeam from "../components/CreateTeam";

type pokeMemb = {
  index: number;
  pokeIndex: number;
};

const TeamPage = () => {
  const [team, setTeam] = useState<Array<number>>([0, 25, 0, 0, 0, 0]);
  // TODO create function to set the pokemon Ids in the team array

  const teamArray = [
    { index: 1, pokeIndex: team[0] },
    { index: 2, pokeIndex: team[1] },
    { index: 3, pokeIndex: team[2] },
    { index: 4, pokeIndex: team[3] },
    { index: 5, pokeIndex: team[4] },
    { index: 6, pokeIndex: team[5] },
  ];

  return (
    <div className="TeamPage flex h-fit">
      <div className="TeamView basis-4/5 flex flex-wrap">
        {teamArray.map((poke: pokeMemb) => {
          return (
            <div key={poke.index} className="m-3">
              <TeamMember pokeId={poke.pokeIndex} />
            </div>
          );
        })}
      </div>
      <div className="CreateTeam basis-1/5">
        <CreateTeam />
      </div>
    </div>
  );
};

export default TeamPage;

//reuse the pokecard component and setting up logic in place so that
//all favorited pokemons are passed as props
//--> array for favorites that is limited to length 6?
