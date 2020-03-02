
export interface ProjectCollection {
  count: number;
  value: Project[];
}

export interface Project {
  id: string;
  name: string,
  url: string,
  state: string,
  revision: number,
  visibility: string,
  lastUpdateTime: Date,
}
