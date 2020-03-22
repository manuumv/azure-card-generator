export type WorkItemType = 'BUG' | 'PRODUCT BACKLOG ITEM' | 'NONE';

export interface WorkItem {
  id: number;
  url: string;
  title: string;
  type: WorkItemType;
  state: string;
  effort: string;
}
