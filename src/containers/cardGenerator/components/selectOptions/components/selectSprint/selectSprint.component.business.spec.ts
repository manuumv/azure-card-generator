import { handleEmptyWorkItemIds } from './selectSprint.component.business';

describe('SelectSprintComponent business', () => {
  it('should return undefined if workItemIds is not empty', () => {
    // Arrange
    const workItemIds = [1, 2 , 3];

    // Act
    const result = handleEmptyWorkItemIds(workItemIds);

    // Assert
    expect(result).toBeUndefined();
  })

  it('should throw an error if workItemIds is empty', () => {
    // Arrange
    const workItemIds = [];

    // Act
    try {
      handleEmptyWorkItemIds(workItemIds);
    } catch (error){
      // Assert
      expect(error.message).toBe('No items in this sprint');
    }
  })
})
