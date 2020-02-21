import { get } from "../../common/utils";
import { teamsEndpoint, sprintEndpoint, iterationEndpoint, workItemsEndpoint } from './endpoints';
import { ApiResponse, Team, Sprint, WorkItem, WorkItemRelations } from '../../model';

export const getTeams = async () => await get<ApiResponse<Team[]>>(teamsEndpoint);
export const getSprints = async (boardId: string) => await get<ApiResponse<Sprint[]>>(sprintEndpoint(boardId));
export const getWorkItemRelations = async (teamId: string, iterationId: string) => (
  await get<WorkItemRelations>(iterationEndpoint(teamId, iterationId))
);

export const getWorkItems = async (workItemsIds) => (
  await get<ApiResponse<WorkItem[]>>(workItemsEndpoint(workItemsIds))
)
