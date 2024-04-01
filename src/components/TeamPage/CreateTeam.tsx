// import use state and API
import { useState, useEffect } from "react";
import useTeam from "../../context/usePoke";
import backendApi from "../../service/backendApi";

type pokeTeam = {
  name: string;
  archived: boolean;
  members: Array<number>;
};

const CreateTeam = () => {
  const { currTeam, setCurrTeam } = useTeam();
  const [teamName, setTeamName] = useState<string>("");

  // TODO if name exists, error!

  // post to backend API when clicking on save button
  async function addTeam(e) {
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
      setTeamName("");
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
    <div className="CreateTeam">
      <div className="w-full">
        <h2 className="text-xl font-bold px-5 py-2 my-2 text-white w-full bg-blue-800 shadow-lg">
          Create a team
        </h2>
        <div className="p-5">
          <div className="mb-3 font-semibold text-lg">
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
            // button is disabled if team is incomplete
            disabled={currTeam.length < 6 ? true : false}
            className="tex-xs mx-1 bg-orange-500 disabled:bg-gray-400 hover:bg-orange-700 text-white font-bold p-1 rounded-lg"
            onClick={addTeam}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
