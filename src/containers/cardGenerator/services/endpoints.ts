const baseEndpoint = `https://dev.azure.com/${process.env.ORGANIZATION}`;
const projectEndpoint = `${baseEndpoint}/${process.env.PROJECT}`;
export const teamsEndpoint = `${baseEndpoint}/_apis/projects/${process.env.PROJECT}/teams?api-version=5.1`;
export const sprintEndpoint = (teamId: string) => `${projectEndpoint}/${teamId}/_apis/work/teamsettings/iterations?api-version=5.1`;
export const iterationEndpoint = (teamId: string, iterationId: string) => `${projectEndpoint}/${teamId}/_apis/work/teamsettings/iterations/${iterationId}/workitems`;
export const workItemsEndpoint = (workItemIds: number[]) => `${baseEndpoint}/_apis/wit/workItems?ids=${workItemIds}&api-version=5.1`;
