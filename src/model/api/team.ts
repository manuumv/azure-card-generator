
export interface Team {
  id: string;
  name: string;
  url: string;
  description: string;
  identityUrl: string;
  projectName: string;
  projectId: string;
}

export interface TeamCollection {
  value: Team[],
  count: number;
}
