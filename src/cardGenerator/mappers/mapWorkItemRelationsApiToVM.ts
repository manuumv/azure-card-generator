import { ApiResponse, WorkItem, WorkItemRelations, WorkItemRelation } from "../../model";

export const mapWorkItemRelationsApiModelToVM = (workItemRelations: WorkItemRelations) => (
  workItemRelations ?
    workItemRelations.workItemRelations.map(mapWorkItemRelationApiModelToVM) :
    []
)

export const mapWorkItemRelationApiModelToVM = (workItemRelation: WorkItemRelation) => (
  workItemRelation ?
    workItemRelation.target.id :
    null
)
