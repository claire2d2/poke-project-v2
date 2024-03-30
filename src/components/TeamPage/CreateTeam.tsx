import backendApi from "../../service/backendApi";

// import use state
import { useState, useEffect } from "react";
import useTeam from "../../context/usePoke";

// import website components
import SmallSprite from "./SmallSprite";

type pokeTeam = {
  name: string;
  archived: boolean;
  members: Array<number>;
};

const CreateTeam = () => {
  const { currTeam, setCurrTeam } = useTeam();
  const [teamFull, setTeamFull] = useState<boolean>(true);
  const [teamName, setTeamName] = useState<string>("");
  const [teamList, setTeamList] = useState<Array<pokeTeam> | null>(null);

  // TODO if name exists, error!

  // TODO list updates automaticallyyy

  // post to backend API when clicking on save button

  async function saveTeam(e) {
    e.preventDefault();
    // TODO add message that if team isn't full, doesn't work
    if (currTeam.length < 6) {
      setTeamFull(false);
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

  // show message when team isn't full

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setTeamFull(true);
    }, 2500);
  }, [teamFull]);

  // handle the input changes for setting the new team name

  const handleName = (e) => {
    const value = e.target.value;
    setTeamName(value);
  };

  // get the team names, and team members from the backend API

  async function fetchTeams() {
    try {
      const response = await backendApi.get<Array<pokeTeam>>("/teams");
      setTeamList(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTeams();
  }, [currTeam]);

  return (
    <div className="flex flex-col overflow-scroll no-scrollbar bg-blue-100 h-full content-center">
      <div className="h-1/4 bg-red-200 py-6">
        <h1 className="font-bold text-2xl">Create a team</h1>
        <div>
          <label htmlFor="team-name">Your team's name:</label>
          <input
            id="team-name"
            type="text"
            placeholder="ex: Team Rocket"
            value={teamName}
            onChange={handleName}
          />
          <button onClick={saveTeam}>Save</button>
        </div>
        <p>{teamFull ? "" : "your team is incomplete"}</p>
      </div>
      <div className="TeamsList h-3/4  px-3 overflow-scroll no-scrollbar">
        <h2 className="text-xl font-bold my-2">List of teams</h2>
        {teamList
          ?.filter((team) => team.archived === true)
          .map((team) => {
            return (
              <div className="" key={team.id}>
                <h3 className="font-semibold">{team.name}</h3>
                <div className="flex items-center bg-orange-100 border border-solid border-gray-50 rounded-xl">
                  {team.members.map((member) => {
                    return <SmallSprite pokeId={Number(member)} />;
                  })}
                  edit
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CreateTeam;
