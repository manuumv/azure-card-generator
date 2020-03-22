export interface Sprint {
  id: string;
  name: string;
  path: string;
  url: string;
  attributes: SprintAttributes;
}

interface SprintAttributes {
  startDate: Date;
  finishDate: Date;
  timeFrame: string;
}

export interface SprintCollection {
  value: Sprint[],
  count: number;
}
