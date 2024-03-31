// import use state and API
import { useState, useEffect } from "react";
import useTeam from "../../context/usePoke";
import backendApi from "../../service/backendApi";

type pokeTeam = {
  id: number;
  name: string;
  archived: boolean;
  members: Array<number>;
};

const EditTeam: React.FC<{ team: pokeTeam }> = ({ team }) => {
  const { currTeam, setCurrTeam, setTeamToEdit } = useTeam();
  const [teamName, setTeamName] = useState<string>(team.name);

  // post to backend API when clicking on save button
  async function editTeam(e) {
    e.preventDefault();
    // if team isn't full return (button is disabled, but just in case)
    if (currTeam.length < 6) {
      return;
    }
    try {
      const response = await backendApi.patch<pokeTeam>(`/teams/${team.id}`, {
        name: teamName,
        archived: true,
        members: currTeam,
      });
      // empty current team when submitting
      setCurrTeam([]);
      // resets to begin a new team
      setTeamToEdit(null);
    } catch (error) {
      console.log(error);
    }
  }

  // handle the input changes for changing the current team name

  const handleName = (e) => {
    const value = e.target.value;
    setTeamName(value);
  };

  return (
    <div className="EditTeam">
      <div className="w-full">
        <h2 className="text-xl font-bold px-5 py-2 my-2 text-white w-full bg-blue-800 shadow-lg">
          Edit your team
        </h2>
        <div className="p-5">
          <div className="mb-3 font-semibold text-lg">
            <label htmlFor="team-name">Your team's name:</label>
          </div>
          <input
            className="w-3/4 p-1"
            id="team-name"
            type="text"
            value={teamName}
            onChange={handleName}
          />
          <button
            onClick={editTeam}
            disabled={currTeam.length < 6 ? true : false}
            className="tex-xs mx-1 bg-orange-500 disabled:bg-gray-400 hover:bg-orange-700 text-white font-bold p-1 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTeam;
