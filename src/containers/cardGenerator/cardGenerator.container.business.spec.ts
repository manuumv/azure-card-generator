import * as business from './cardGenerator.container.business';
import { WorkItem } from './viewmodel';

describe('CardGenerator container business', () => {
  describe('filterStates', () => {
    it('should return an empty array if workItems are not array', () => {
      // Arrange
      const workItems: WorkItem[] = null;
      const expectedResult: string[] = [];

      // Act
      const result = business.filterStates(workItems);

      // Assert
      expect(result).toEqual(expectedResult);
    });

    it('should return the expected result and filter duplicated values', () => {
      // Arrange
      const workItem1 = { state: 'done' } as WorkItem;
      const workItem2 = { state: 'locked' } as WorkItem;
      const workItem3 = { state: 'locked' } as WorkItem;
      const workItems: WorkItem[] = [workItem1, workItem2, workItem3];
      const expectedResult: string[] = [workItem1.state, workItem2.state];

      // Act
      const result = business.filterStates(workItems);

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('filterWorkItems', () => {
    it('should return null if workItems are null', () => {
      // Arrange
      const workItems: WorkItem[] = null;
      const filters: string[] = ['done'];

      // Act
      const result = business.filterWorkItems(workItems, filters);

      // Assert
      expect(result).toBeNull();
    });

    it('should return the same workItems if filters are null', () => {
      // Arrange
      const workItem1 = { state: 'done' } as WorkItem;
      const workItem2 = { state: 'locked' } as WorkItem;
      const workItems: WorkItem[] = [workItem1, workItem2];
      const filters: string[] = null;
      const expectedResult = [[workItem1, workItem2]];

      // Act
      const result = business.filterWorkItems(workItems, filters);

      // Assert
      expect(result).toEqual(expectedResult);
    });


    it('should return the expected result filtered', () => {
      // Arrange
      const workItem1 = { state: 'done' } as WorkItem;
      const workItem2 = { state: 'locked' } as WorkItem;
      const workItems: WorkItem[] = [workItem1, workItem2];
      const filters: string[] = ['done'];
      const expectedResult = [[workItem1]];

      // Act
      const result = business.filterWorkItems(workItems, filters);

      // Assert
      expect(result).toEqual(expectedResult);
    });

    it('should return the expected result filtered and paginated', () => {
      // Arrange
      const workItem1 = { state: 'done' } as WorkItem;
      const workItem2 = { state: 'locked' } as WorkItem;
      const workItems: WorkItem[] = [...new Array(15).fill(workItem1), workItem2];
      const filters: string[] = ['done'];
      const expectedResult = [new Array(10).fill(workItem1), new Array(5).fill(workItem1)];

      // Act
      const result = business.filterWorkItems(workItems, filters);

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
