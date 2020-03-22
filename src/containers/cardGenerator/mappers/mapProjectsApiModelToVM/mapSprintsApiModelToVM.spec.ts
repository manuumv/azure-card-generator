import * as mappers from './mapProjectsApiModelToVM';
import * as ApiModel from "../../../../api/model";
import * as ViewModel from "../../viewmodel";

describe('mapProjectsApiModelToVM', () => {
  describe('mapProjectsApiModelToVM', () => {
    it('should return an empty array if projects are null', () => {
      // Arrange
      const projectCollection: ApiModel.ProjectCollection = {
        value: null,
        count: 10,
      };
      const expectedResult: ViewModel.Project[] = [];

      // Act
      const result = mappers.mapProjectsApiModelToVM(projectCollection);

      // Assert
      expect(result).toEqual(expectedResult);
    })

    it('should call mapProjectApiModelToVM and return the expected project array', () => {
      // Arrange
      const mockedProject = { id: '1' } as ApiModel.Project;
      const projectCollection: ApiModel.ProjectCollection = {
        value: [mockedProject],
        count: 10,
      };
      const expectedmockedProject = { id: mockedProject.id } as ViewModel.Project;
      const expectedResult: ViewModel.Project[] = [expectedmockedProject];
      const spymapProjectApiModelToVM = jest.spyOn(mappers, 'mapProjectApiModelToVM').mockReturnValue(expectedmockedProject);

      // Act
      const result = mappers.mapProjectsApiModelToVM(projectCollection);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(spymapProjectApiModelToVM).toHaveBeenCalledWith(mockedProject, 0, [mockedProject]);
    })
  })

  describe('mapProjectApiModelToVM', () => {
    it('should return null if project is null', () => {
      // Arrange
      const mockedProject = null;

      // Act
      const result = mappers.mapProjectApiModelToVM(mockedProject);

      // Assert
      expect(result).toBeNull();
    })

    it('should return the expected project object', () => {
      // Arrange
      const mockedProject = { id: '1' } as ApiModel.Project;
      const expectedResult = { id: mockedProject.id } as ViewModel.Project;

      // Act
      const result = mappers.mapProjectApiModelToVM(mockedProject);

      // Assert
      expect(result).toEqual(expectedResult);
    })
  })
})
