import { useState, useEffect } from "react";
import backendApi from "../../service/backendApi";

// import team components
import SmallSprite from "./SmallSprite";
import editIcon from "../../assets/edit_team.png";
import deleteIcon from "../../assets/delete_team.png";

// import global state
import useTeam from "../../context/usePoke";

type pokeTeam = {
  name: string;
  archived: boolean;
  members: Array<number>;
};

const TeamsList = () => {
  const { currTeam } = useTeam();

  const [teamList, setTeamList] = useState<Array<pokeTeam>>([]);
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

  // delete teams when clicking on delete button

  async function deleteTeam(id: number) {
    try {
      const response = await backendApi.delete<Array<pokeTeam>>(`/teams/${id}`);
      console.log(response);
      fetchTeams();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="TeamsList h-3/4  px-3 overflow-scroll no-scrollbar bg-green-200">
      <h2 className="text-xl font-bold my-2">List of teams</h2>
      {teamList.length === 0
        ? "No teams at the moment ..."
        : teamList
            ?.filter((team) => team.archived === true)
            .map((team) => {
              return (
                <div className="" key={team.id}>
                  <h3 className="font-semibold">{team.name}</h3>
                  <div className="relative group bg-orange-100 border border-solid border-gray-50 rounded-xl hover:bg-orange-200">
                    {/* button to delete team if possible, only visible when hovering on the team */}
                    <button
                      onClick={() => deleteTeam(team.id)}
                      className="absolute right-2 text-red-500 text-xl font-bold hidden group-hover:block"
                    >
                      x
                    </button>
                    <div className="flex items-center">
                      {team.members.map((member: number) => {
                        return <SmallSprite pokeId={Number(member)} />;
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
    </div>
  );
};

export default TeamsList;
