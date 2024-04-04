// import use state and API
import { useState, ChangeEvent, MouseEvent } from "react";
import useTeam from "../../context/usePoke";
import backendApi from "../../service/backendApi";

// import style
import { TeamTitle } from "./TeamPageStyle";
import { pokeTeam } from "./TeamData";

const EditTeam: React.FC<{ team: pokeTeam }> = ({ team }) => {
  const { currTeam, setCurrTeam, setTeamToEdit, isShiny } = useTeam();
  const [teamName, setTeamName] = useState<string>(team.name);

  // post to backend API when clicking on save button
  async function editTeam(e: MouseEvent<HTMLElement>) {
    e.preventDefault();
    // if team isn't full return (button is disabled, but just in case)
    if (currTeam.length < 6) {
      return;
    }
    try {
      await backendApi.patch<pokeTeam>(`/teams/${team.id}`, {
        name: teamName,
        isShiny: isShiny,
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

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTeamName(value);
  };

  // handle user wanting to create a new team

  const switchToCreate = () => {
    setTeamToEdit(null);
    setCurrTeam([]);
  };
  return (
    <div className="EditTeam">
      <div className="w-full">
        <TeamTitle>Edit your team</TeamTitle>
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
          <div>
            <button
              onClick={() => switchToCreate()}
              className="bg-orange-500 text-white rounded-lg px-2 py-1 font-semibold mt-3 hover:bg-orange-600"
            >
              Create a new team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTeam;
