import React from "react";

import TeamMember from "../components/TeamMember";
import CreateTeam from "../components/CreateTeam";

const TeamPage = () => {
  const testArray = [1, 25, 25, 25, 25, 25];

  return (
    <div className="TeamPage flex h-fit">
      <div className="TeamView basis-4/5 flex flex-wrap">
        {testArray.map((id: number) => {
          return (
            <div key={id} className="m-3">
              <TeamMember pokeId={id} />
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
