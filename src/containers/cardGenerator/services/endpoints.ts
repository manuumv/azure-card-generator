import { localStorageAccountInfo } from "../../../common/services";

const organization = localStorageAccountInfo.get()?.organization;

const baseEndpoint = `https://dev.azure.com/${organization}`;

export const projectEndpoint = `https://dev.azure.com/${organization}/_apis/projects?api-version=5.1`;

export const teamsEndpoint = (projectName: string) => (
  `${baseEndpoint}/_apis/projects/${projectName}/teams?api-version=5.1`
);

export const sprintEndpoint = (projectName: string, teamId: string) => (
  `${baseEndpoint}/${projectName}/${teamId}/_apis/work/teamsettings/iterations?api-version=5.1`
);

export const iterationEndpoint = (projectName: string, teamId: string, iterationId: string) => (
  `${baseEndpoint}/${projectName}/${teamId}/_apis/work/teamsettings/iterations/${iterationId}/workitems`
);

export const workItemsEndpoint = (projectName: string, workItemIds: number[]) => (
  `${baseEndpoint}/${projectName}/_apis/wit/workItems?ids=${workItemIds}&api-version=5.1`
);
