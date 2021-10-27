const baseEndpoint = (organization: string) => `https://dev.azure.com/${organization}`;

export const projectEndpoint = (organization: string): string => (
  `https://dev.azure.com/${organization}/_apis/projects?api-version=5.1`
);

export const teamsEndpoint = (organization: string, projectName: string): string => (
  `${baseEndpoint(organization)}/_apis/projects/${projectName}/teams?api-version=5.1`
);

export const sprintEndpoint = (organization: string, projectName: string, teamId: string): string => (
  `${baseEndpoint(organization)}/${projectName}/${teamId}/_apis/work/teamsettings/iterations?api-version=5.1`
);

export const iterationEndpoint = (organization: string, projectName: string, teamId: string, iterationId: string): string => (
  `${baseEndpoint(organization)}/${projectName}/${teamId}/_apis/work/teamsettings/iterations/${iterationId}/workitems`
);

export const workItemsEndpoint = (organization: string, projectName: string, workItemIds: number[]): string=> (
  `${baseEndpoint(organization)}/${projectName}/_apis/wit/workItems?ids=${workItemIds}&api-version=5.1`
);
