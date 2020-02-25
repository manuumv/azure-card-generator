export interface WorkItem {
  id: number;
  url: string;
  title: string;
  type: WorkItemType;
  state: string;
  effort: string;
}

export enum WorkItemType {
  BUG = 'BUG',
  PBI = 'PRODUCT BACKLOG ITEM',
  NONE = 'NONE'
}
