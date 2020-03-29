import { WorkItem } from "../../viewmodel";
import { splitEvery } from "ramda";

export const filterWorkItems = (workItems: WorkItem[], filters: string[]): WorkItem[][] => {
  const isArrayWorkItems = Array.isArray(workItems);
  const isArrayFilters = Array.isArray(filters);

  if (isArrayWorkItems && !isArrayFilters) {
    return splitEvery(10, workItems);
  }

  if (isArrayWorkItems && isArrayFilters) {
    const filterWorkItems = workItems.filter(workItem => filters.includes(workItem.state));
    return splitEvery(10, filterWorkItems);
  }

  return null;
};
