import * as ApiModel from "../../../../model/api";
import * as ViewModel from "../../viewmodel";

export const mapWorkItemsApiModelToVM = (workItems: ApiModel.WorkItemCollection): ViewModel.WorkItem[] => (
  workItems && Array.isArray(workItems.value) ?
    workItems.value.map(mapWorkItemApiModelToVM) :
    []
)

export const mapWorkItemApiModelToVM = (workItem: ApiModel.WorkItem): ViewModel.WorkItem => (
  workItem ?
    {
      id: workItem.id,
      url: workItem.url,
      type: mapWorkItemTypeApiModelToVM(workItem.fields["System.WorkItemType"]),
      title: workItem.fields && workItem.fields["System.Title"],
      state: workItem.fields && workItem.fields["System.State"],
      effort: workItem.fields && workItem.fields["Microsoft.VSTS.Scheduling.Effort"]
    } :
    null
)

export const mapWorkItemTypeApiModelToVM = (type: ApiModel.WorkItemType): ViewModel.WorkItemType => {
  switch (type.toUpperCase()) {
    case 'BUG':
      return 'BUG';
    case "PRODUCT BACKLOG ITEM":
      return 'PRODUCT BACKLOG ITEM';
    default:
      return 'NONE';
  }
}
