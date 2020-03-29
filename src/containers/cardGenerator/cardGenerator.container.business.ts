import { WorkItem } from './viewmodel';
import { uniq, compose } from 'ramda';

const mapStates = (workItems: WorkItem[]): string[] => (
  Array.isArray(workItems) ?
    workItems.map(({ state }) => state) :
    []
);

export const filterStates: (workItems: WorkItem[]) => string[] = compose(uniq, mapStates);
