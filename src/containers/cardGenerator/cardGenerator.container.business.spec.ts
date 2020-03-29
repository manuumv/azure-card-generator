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
});
