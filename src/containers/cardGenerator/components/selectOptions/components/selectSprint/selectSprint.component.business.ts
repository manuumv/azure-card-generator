import { isEmpty } from 'ramda';

export const handleEmptyWorkItemIds = (workItemIds: number[]) => {
  if(isEmpty(workItemIds)) {
    throw new Error('No items in this sprint')
  }
}
