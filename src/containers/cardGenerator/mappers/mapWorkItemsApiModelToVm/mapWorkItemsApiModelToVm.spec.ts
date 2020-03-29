import * as mappers from './mapWorkItemsApiModelToVm';
import * as ApiModel from 'api/model';
import * as ViewModel from '../../viewmodel';

describe('mapWorkItemsApiModelToVM', () => {
  describe('mapWorkItemsApiModelToVM', () => {
    it('should return an empty array if workItemCollection.value is null', () => {
      // Arrange
      const workItemCollection: ApiModel.WorkItemCollection = {
        value: null,
        count: 10,
      };
      const expectedResult: ViewModel.WorkItem[] = [];

      // Act
      const result = mappers.mapWorkItemsApiModelToVM(workItemCollection);

      // Assert
      expect(result).toEqual(expectedResult);
    })

    it('should call mapWorkItemApiModelToVM and return the expected WorkItems array', () => {
      // Arrange
      const mockedWorkItem = { id: 1 } as ApiModel.WorkItem;
      const workItemCollection: ApiModel.WorkItemCollection = {
        value: [mockedWorkItem],
        count: 1,
      };
      const expectedMockedTeam = { id: mockedWorkItem.id } as ViewModel.WorkItem;
      const expectedResult: ViewModel.WorkItem[] = [expectedMockedTeam];
      const spyMapWorkItemApiModelToVM = jest.spyOn(mappers, 'mapWorkItemApiModelToVM').mockReturnValue(expectedMockedTeam);

      // Act
      const result = mappers.mapWorkItemsApiModelToVM(workItemCollection);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(spyMapWorkItemApiModelToVM).toHaveBeenCalledWith(mockedWorkItem, 0, [mockedWorkItem]);
    })
  })

  describe('mapWorkItemApiModelToVM', () => {
    it('should return an empty array if workItem is null', () => {
      // Arrange:
      const mockedWorkItem: ApiModel.WorkItem = null;

      // Act
      const result = mappers.mapWorkItemApiModelToVM(mockedWorkItem);

      // Assert
      expect(result).toBeNull();
    })

    it('should return the expected WorkItem object', () => {
      // Arrange
      const mockedWorkItem = { id: 1, fields: { 'System.WorkItemType': 'PRODUCT BACKLOG ITEM' } } as ApiModel.WorkItem;
      const expectedResult: ViewModel.WorkItem = {
        id: mockedWorkItem.id,
        effort: mockedWorkItem.fields['Microsoft.VSTS.Scheduling.Effort'],
        state: mockedWorkItem.fields['System.State'],
        title: mockedWorkItem.fields['System.Title'],
        type: 'PRODUCT BACKLOG ITEM',
        url: mockedWorkItem.url
      };
      const mockedWorkItemType = 'PRODUCT BACKLOG ITEM';
      const spyMapWorkItemTypeApiModelToVM = jest.spyOn(mappers, 'mapWorkItemTypeApiModelToVM').mockReturnValue(mockedWorkItemType);

      // Act
      const result = mappers.mapWorkItemApiModelToVM(mockedWorkItem);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(spyMapWorkItemTypeApiModelToVM).toHaveBeenCalledWith(mockedWorkItem.fields['System.WorkItemType']);
    })
  })

  describe('mapWorkItemTypeApiModelToVM', () => {
    it('should return product backlog item', () => {
      // Arrange:
      const type = 'product backlog item';
      const expectedResult: ViewModel.WorkItemType = 'PRODUCT BACKLOG ITEM';

      // Act
      const result = mappers.mapWorkItemTypeApiModelToVM(type);

      // Assert
      expect(result).toBe(expectedResult);
    })

    it('should return bug', () => {
      // Arrange
      const type = 'bug';
      const expectedResult: ViewModel.WorkItemType = 'BUG';

      // Act
      const result = mappers.mapWorkItemTypeApiModelToVM(type);

      // Assert
      expect(result).toBe(expectedResult);
    })

    it('should return none', () => {
      // Arrange
      const type = 'TEST';
      const expectedResult: ViewModel.WorkItemType = '';

      // Act
      const result = mappers.mapWorkItemTypeApiModelToVM(type);

      // Assert
      expect(result).toBe(expectedResult);
    })
  })
})
