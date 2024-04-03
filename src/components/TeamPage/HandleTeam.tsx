import CreateTeam from "./CreateTeam";
import EditTeam from "./EditTeam";
import TeamsList from "./TeamsList";

// import use state
import useTeam from "../../context/usePoke";

const HandleTeam = () => {
  const { teamToEdit } = useTeam();
  return (
    <div className="flex flex-col  overflow-scroll no-scrollbar bg-orange-50 h-full w-full content-center shadow-xl">
      <h2>
        Here have pokeballs show up depending on how many are in the current
        team
      </h2>
      <div className="w-full">
        {/* if no team to edit, show create team. If team has been chosen to edit, show edit team */}
        {!teamToEdit ? <CreateTeam /> : <EditTeam team={teamToEdit} />}
      </div>

      <TeamsList />
    </div>
  );
};

export default HandleTeam;
