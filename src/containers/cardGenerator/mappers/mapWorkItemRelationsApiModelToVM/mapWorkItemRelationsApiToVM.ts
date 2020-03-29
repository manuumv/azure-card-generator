import * as ApiModel from 'api/model';

export const mapWorkItemRelationsApiModelToVM = (workItemRelationCollection: ApiModel.WorkItemRelationCollection): number[] => (
  workItemRelationCollection && Array.isArray(workItemRelationCollection.workItemRelations) ?
    workItemRelationCollection.workItemRelations.map(mapWorkItemRelationApiModelToVM) :
    []
)

export const mapWorkItemRelationApiModelToVM = (workItemRelation: ApiModel.WorkItemRelation): number => (
  workItemRelation ?
    workItemRelation.target?.id :
    null
)
