import { ApiResponse, WorkItem } from "../../model";

export const mapWorkItemsApiModelToVM = (workItems: ApiResponse<WorkItem[]>) => (
  workItems ?
    workItems.value :
    []
)
