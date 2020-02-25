import * as mappers from './mapWorkItemsApiModelToVm';
import * as ApiModel from "../../../../model/api";
import * as ViewModel from "../../../../model/view";

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
      const mockedWorkItem = { id: 1 } as ApiModel.WorkItem;
      const expectedResult = { id: mockedWorkItem.id } as ViewModel.WorkItem;

      // Act
      const result = mappers.mapWorkItemApiModelToVM(mockedWorkItem);

      // Assert
      expect(result).toEqual(expectedResult);
    })
  })
})
