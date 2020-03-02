import { get } from "../../../common/utils/httpHelper";
import { teamsEndpoint, sprintEndpoint, iterationEndpoint, workItemsEndpoint, projectEndpoint } from './endpoints';
import { TeamCollection, SprintCollection, WorkItemCollection, WorkItemRelationCollection, ProjectCollection } from '../../../model/api';

export const getProjects = async () => await get<ProjectCollection>(projectEndpoint);

export const getTeams = async (projectName: string) => await get<TeamCollection>(teamsEndpoint(projectName));

export const getSprints = async (projectName: string, boardId: string) => (
  await get<SprintCollection>(sprintEndpoint(projectName, boardId))
);

export const getWorkItemRelations = async (projectName: string, teamId: string, iterationId: string) => (
  await get<WorkItemRelationCollection>(iterationEndpoint(projectName, teamId, iterationId))
);

export const getWorkItems = async (projectName: string, workItemsIds: number[]) => (
  await get<WorkItemCollection>(workItemsEndpoint(projectName, workItemsIds))
)
