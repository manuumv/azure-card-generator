import * as mappers from './mapSprintsApiModelToVM';
import * as ApiModel from 'api/model';
import * as ViewModel from '../../viewmodel';

describe('mapSprintsApiModelToVM', () => {
  describe('mapSprintsApiModelToVM', () => {
    it('should return an empty array if sprints are null', () => {
      // Arrange
      const sprintCollection: ApiModel.SprintCollection = {
        value: null,
        count: 10,
      };
      const expectedResult: ViewModel.Sprint[] = [];

      // Act
      const result = mappers.mapSprintsApiModelToVM(sprintCollection);

      // Assert
      expect(result).toEqual(expectedResult);
    })

    it('should call mapSprintApiModelToVM and return the expected sprint array', () => {
      // Arrange
      const mockedSprint = { id: '1' } as ApiModel.Sprint;
      const sprintCollection: ApiModel.SprintCollection = {
        value: [mockedSprint],
        count: 10,
      };
      const expectedMockedSprint = { id: mockedSprint.id } as ViewModel.Sprint;
      const expectedResult: ViewModel.Sprint[] = [expectedMockedSprint];
      const spyMapSprintApiModelToVM = jest.spyOn(mappers, 'mapSprintApiModelToVM').mockReturnValue(expectedMockedSprint);

      // Act
      const result = mappers.mapSprintsApiModelToVM(sprintCollection);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(spyMapSprintApiModelToVM).toHaveBeenCalledWith(mockedSprint, 0, [mockedSprint]);
    })
  })

  describe('mapSprintApiModelToVM', () => {
    it('should return null if sprint is null', () => {
      // Arrange
      const mockedSprint = null;

      // Act
      const result = mappers.mapSprintApiModelToVM(mockedSprint);

      // Assert
      expect(result).toBeNull();
    })

    it('should return the expected sprint object', () => {
      // Arrange
      const mockedSprint = { id: '1' } as ApiModel.Sprint;
      const expectedResult = { id: mockedSprint.id } as ViewModel.Sprint;

      // Act
      const result = mappers.mapSprintApiModelToVM(mockedSprint);

      // Assert
      expect(result).toEqual(expectedResult);
    })
  })
})
