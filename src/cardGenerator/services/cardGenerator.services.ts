import { get } from "../../common/utils";
import { teamsEndpoint, sprintEndpoint, iterationEndpoint, workItemsEndpoint } from './endpoints';
import { TeamCollection, SprintCollection, WorkItemCollection, WorkItemRelationCollection } from '../../model/api';

export const getTeams = async () => await get<TeamCollection>(teamsEndpoint);

export const getSprints = async (boardId: string) => await get<SprintCollection>(sprintEndpoint(boardId));

export const getWorkItemRelations = async (teamId: string, iterationId: string) => (
  await get<WorkItemRelationCollection>(iterationEndpoint(teamId, iterationId))
);

export const getWorkItems = async (workItemsIds: number[]) => (
  await get<WorkItemCollection>(workItemsEndpoint(workItemsIds))
)
