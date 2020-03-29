import { WorkItemType } from '../../../viewmodel';
import { getCardBackgroundColor } from './card.component.business';
import { WorkItemTypeColors } from 'styles';

describe('CardComponent business', () => {
  describe('getCardBackgroundColor', () => {
    it('should return WorkItemTypeColors.pbi if workItemType is not defined', () => {
      // Arrange
      const workItemType: WorkItemType = null;
      const expectedResult = WorkItemTypeColors.pbi;

      // Act
      const result = getCardBackgroundColor(workItemType);

      // Assert
      expect(result).toBe(expectedResult)
    });

    it('should return WorkItemTypeColors.pbi', () => {
      // Arrange
      const workItemType: WorkItemType = 'PRODUCT BACKLOG ITEM';
      const expectedResult = WorkItemTypeColors.pbi;

      // Act
      const result = getCardBackgroundColor(workItemType);

      // Assert
      expect(result).toBe(expectedResult)
    });

    it('should return WorkItemTypeColors.bug', () => {
      // Arrange
      const workItemType: WorkItemType = 'BUG';
      const expectedResult = WorkItemTypeColors.bug;

      // Act
      const result = getCardBackgroundColor(workItemType);

      // Assert
      expect(result).toBe(expectedResult)
    });

    it('should return WorkItemTypeColors.task', () => {
      // Arrange
      const workItemType: WorkItemType = 'TASK';
      const expectedResult = WorkItemTypeColors.task;

      // Act
      const result = getCardBackgroundColor(workItemType);

      // Assert
      expect(result).toBe(expectedResult)
    });
  });
})
