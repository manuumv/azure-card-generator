export type WorkItemType = 'BUG' | 'PRODUCT BACKLOG ITEM' | 'TASK' | '';

export interface WorkItem {
  id: number;
  url: string;
  title: string;
  type: WorkItemType;
  state: string;
  effort: string;
}
