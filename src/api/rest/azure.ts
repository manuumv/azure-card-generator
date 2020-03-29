import { get } from 'common/utils/httpHelper';
import { teamsEndpoint, sprintEndpoint, iterationEndpoint, workItemsEndpoint, projectEndpoint } from './endpoints';
import { TeamCollection, SprintCollection, WorkItemCollection, WorkItemRelationCollection, ProjectCollection } from '../model';

export const getProjects = async (organization: string) => await get<ProjectCollection>(projectEndpoint(organization));

export const getTeams = async (organization: string, projectName: string) => (
  await get<TeamCollection>(teamsEndpoint(organization, projectName))
);

export const getSprints = async (organization: string, projectName: string, teamId: string) => (
  await get<SprintCollection>(sprintEndpoint(organization, projectName, teamId))
);

export const getWorkItemRelations = async (organization: string, projectName: string, teamId: string, iterationId: string) => (
  await get<WorkItemRelationCollection>(iterationEndpoint(organization, projectName, teamId, iterationId))
);

export const getWorkItems = async (organization: string, projectName: string, workItemsIds: number[]) => (
  await get<WorkItemCollection>(workItemsEndpoint(organization, projectName, workItemsIds))
)
