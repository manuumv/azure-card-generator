export interface WorkItem {
  id: number;
  rev: number;
  fields: WorkItemFields;
  url: string;
}

interface WorkItemFields {
  'System.Title': string;
  'System.WorkItemType': string;
  'System.State': string;
  'System.Effort': string;
}
