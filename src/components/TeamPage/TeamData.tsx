import { Dispatch, SetStateAction } from "react";
import backendApi from "../../service/backendApi";

// type for poketeam data
export type pokeTeam = {
  id: number;
  name: string;
  archived: boolean;
  isShiny: boolean;
  members: number[];
};

type SetTeamList = Dispatch<SetStateAction<pokeTeam[] | null>>;

export async function fetchTeams(setTeamList: SetTeamList) {
  try {
    const response = await backendApi.get<Array<pokeTeam>>("/teams");
    setTeamList(response.data);
  } catch (error) {
    console.log(error);
  }
}
