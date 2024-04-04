import CreateTeam from "./CreateTeam";
import EditTeam from "./EditTeam";
import TeamsList from "./TeamsList";

// import use state
import { useState, useEffect } from "react";
import useTeam from "../../context/usePoke";

import pokeballImg from "../../assets/small-pokeball.png";
import noPokeImg from "../../assets/nopokeball.png";

type emptyTeamElem = { num: number; index: number };

const HandleTeam: React.FC<{ emptyTeam: emptyTeamElem[] }> = ({
  emptyTeam,
}) => {
  const { teamToEdit, currTeam } = useTeam();
  const [vacancy, setVacancy] = useState<emptyTeamElem[]>([]);

  useEffect(() => {
    setVacancy(emptyTeam);
  }, [emptyTeam]);

  return (
    <div className="flex flex-col  overflow-scroll no-scrollbar bg-orange-50 h-full w-full content-center shadow-xl">
      <div className="flex">
        {currTeam.map(() => {
          return (
            <div>
              <img src={pokeballImg} alt="" />
            </div>
          );
        })}
        {vacancy?.map(() => {
          return (
            <div>
              <img src={noPokeImg} alt="" />
            </div>
          );
        })}
      </div>
      <div className="w-full">
        {/* if no team to edit, show create team. If team has been chosen to edit, show edit team */}
        {!teamToEdit ? <CreateTeam /> : <EditTeam team={teamToEdit} />}
      </div>

      <div className="relative overflow-hidden z-5">
        <TeamsList />
      </div>
    </div>
  );
};

export default HandleTeam;
