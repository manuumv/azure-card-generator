import { ApiResponse, Sprint } from "../../model";

export const mapSprintsApiModelToVM = (sprints: ApiResponse<Sprint[]>) => (
  sprints ?
    sprints.value :
    []
)
