import { WorkItem } from './viewmodel';
import { uniq, compose, splitEvery } from 'ramda';

const mapStates = (workItems: WorkItem[]) => workItems.map(({ state }) => state);
const filteredStates = compose(uniq, mapStates);

export const filterStates = (workItems: WorkItem[]) => (
  Array.isArray(workItems) ? filteredStates(workItems) : []
)

export const getFilteredWorkItems = (workItems: WorkItem[], filters: string[]) => {
  const filterWorkItems = workItems && workItems.filter(workItem => filters.includes(workItem.state));
  const paginatedWorkItems = filterWorkItems && splitEvery(10, filterWorkItems);
  return paginatedWorkItems;
}
