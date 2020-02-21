import { ApiResponse, Team } from "../../model";

export const mapTeamsApiModelToVM = (teams: ApiResponse<Team[]>) => (
  teams ?
    teams.value :
    []
)
