export interface Loading {
  projects: boolean;
  teams: boolean;
  sprints: boolean;
  workItems: boolean;
}

export type LoadingKeys = 'projects' | 'teams' | 'sprints' | 'workItems';
