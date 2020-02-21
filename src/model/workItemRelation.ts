
export interface WorkItemRelation {
  target: TargetWorkItem;
}

interface TargetWorkItem {
  id: string;
}

export interface WorkItemRelations {
  workItemRelations: WorkItemRelation[];
}
