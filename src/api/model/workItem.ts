export interface WorkItem {
  id: number;
  rev: number;
  fields: WorkItemFields;
  url: string;
}

export type WorkItemType = 'BUG' | 'PRODUCT BACKLOG ITEM';

interface WorkItemFields {
  'System.Title': string;
  'System.WorkItemType': string;
  'System.State': string;
  'Microsoft.VSTS.Scheduling.Effort': string;
}

export interface WorkItemCollection {
  value: WorkItem[],
  count: number;
}
