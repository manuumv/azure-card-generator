import { WorkItemType } from '../../../viewmodel';
import { WorkItemTypeColors } from 'styles';

export const getCardBackgroundColor = (workItemType: WorkItemType) => {
  switch (workItemType) {
    case 'PRODUCT BACKLOG ITEM':
      return WorkItemTypeColors.pbi;
    case 'BUG':
      return WorkItemTypeColors.bug;
    case 'TASK':
      return WorkItemTypeColors.task;
    default:
      return WorkItemTypeColors.pbi
  }
}
