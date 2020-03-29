import { WorkItem } from '../../viewmodel';
import { filterWorkItems } from './cardPage.component.business';

  describe('filterWorkItems', () => {
    it('should return null if workItems are null', () => {
      // Arrange
      const workItems: WorkItem[] = null;
      const filters: string[] = ['done'];

      // Act
      const result = filterWorkItems(workItems, filters);

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
      const result = filterWorkItems(workItems, filters);

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
      const result = filterWorkItems(workItems, filters);

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
      const result = filterWorkItems(workItems, filters);

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
