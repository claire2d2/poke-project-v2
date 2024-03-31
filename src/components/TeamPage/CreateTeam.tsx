import backendApi from "../../service/backendApi";

// import use state
import { useState, useEffect } from "react";
import useTeam from "../../context/usePoke";

import TeamsList from "./TeamsList";

type pokeTeam = {
  name: string;
  archived: boolean;
  members: Array<number>;
};

const CreateTeam = () => {
  const { currTeam, setCurrTeam } = useTeam();
  const [teamName, setTeamName] = useState<string>("");

  // TODO if name exists, error!

  // TODO list updates automaticallyyy

  // post to backend API when clicking on save button
  async function saveTeam(e) {
    e.preventDefault();
    // if team isn't full return (button is disabled, but just in case)
    if (currTeam.length < 6) {
      return;
    }
    try {
      const response = await backendApi.post<pokeTeam>(`/teams`, {
        name: teamName,
        archived: true,
        members: currTeam,
      });
      // empty current team when submitting
      setCurrTeam([]);
    } catch (error) {
      console.log(error);
    }
  }

  // handle the input changes for setting the new team name

  const handleName = (e) => {
    const value = e.target.value;
    setTeamName(value);
  };

  return (
    <div className="flex flex-col  overflow-scroll no-scrollbar bg-orange-50 h-full w-full content-center shadow-xl">
      <div className="h-1/4 py-6 px-3 ">
        <h1 className="font-bold text-2xl">Create a team</h1>
        <div>
          <div>
            <label htmlFor="team-name">Your team's name:</label>
          </div>
          <input
            className="w-3/4 p-1"
            id="team-name"
            type="text"
            placeholder="ex: Team Rocket"
            value={teamName}
            onChange={handleName}
          />
          <button
            disabled={currTeam.length < 6 ? true : false}
            className="tex-xs mx-1 bg-orange-500 disabled:bg-gray-400 hover:bg-orange-700 text-white font-bold p-1 rounded-lg"
            onClick={saveTeam}
          >
            Save
          </button>
        </div>
      </div>
      <TeamsList />
    </div>
  );
};

export default CreateTeam;
