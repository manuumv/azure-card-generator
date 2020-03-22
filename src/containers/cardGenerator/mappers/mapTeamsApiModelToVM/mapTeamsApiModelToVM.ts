import * as ApiModel from "../../../../api/model";
import * as ViewModel from "../../viewmodel";

export const mapTeamsApiModelToVM = (teams: ApiModel.TeamCollection): ViewModel.Team[] => (
  teams && Array.isArray(teams.value) ?
    teams.value.map(mapTeamApiModelToVM) :
    []
)

export const mapTeamApiModelToVM = (team: ApiModel.Team): ViewModel.Team => (
  team ?
    team :
    null
)
