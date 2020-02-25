import * as ApiModel from "../../../model/api";
import * as ViewModel from "../../../model/view";

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
      type: workItem.fields && workItem.fields["System.WorkItemType"].toUpperCase() as ViewModel.WorkItemType,
      title: workItem.fields && workItem.fields["System.Title"],
      state: workItem.fields && workItem.fields["System.State"],
      effort: workItem.fields && workItem.fields["Microsoft.VSTS.Scheduling.Effort"]
    } :
    null
)
