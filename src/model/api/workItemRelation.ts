
export interface WorkItemRelation {
  target: TargetWorkItem;
}

interface TargetWorkItem {
  id: number;
}

export interface WorkItemRelationCollection {
  workItemRelations: WorkItemRelation[];
}
