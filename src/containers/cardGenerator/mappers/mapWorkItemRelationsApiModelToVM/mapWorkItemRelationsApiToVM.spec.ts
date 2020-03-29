import * as mappers from './mapWorkItemRelationsApiToVM';
import * as ApiModel from 'api/model';
import * as ViewModel from '../../viewmodel';

describe('mapWorkItemRelationsApiModelToVM', () => {
  describe('mapWorkItemRelationsApiModelToVM', () => {
    it('should return an empty array if WorkItemRelations are null', () => {
      // Arrange
      const workItemRelationCollection: ApiModel.WorkItemRelationCollection = {
        workItemRelations: null,
      };
      const expectedResult: ViewModel.Team[] = [];

      // Act
      const result = mappers.mapWorkItemRelationsApiModelToVM(workItemRelationCollection);

      // Assert
      expect(result).toEqual(expectedResult);
    })

    it('should call mapWorkItemRelationApiModelToVM and return the expected number array', () => {
      // Arrange
      const mockedWorkItemRelation = { target: { id: 1 } } as ApiModel.WorkItemRelation;
      const mockedWorkItemRelations: ApiModel.WorkItemRelationCollection = { workItemRelations: [mockedWorkItemRelation] }
      const expectedResult: number[] = [mockedWorkItemRelation.target.id];
      const spyMapWorkItemRelationApiModelToVM = jest.spyOn(mappers, 'mapWorkItemRelationApiModelToVM').mockReturnValue(mockedWorkItemRelation.target.id);

      // Act
      const result = mappers.mapWorkItemRelationsApiModelToVM(mockedWorkItemRelations);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(spyMapWorkItemRelationApiModelToVM).toHaveBeenCalledWith(mockedWorkItemRelation, 0, [mockedWorkItemRelation]);
    })
  })

  describe('mapWorkItemRelationApiModelToVM', () => {
    it('should return null if WorkItemRelation is null', () => {
      // Arrange
      const mockedWorkItemRelation = null;

      // Act
      const result = mappers.mapWorkItemRelationApiModelToVM(mockedWorkItemRelation);

      // Assert
      expect(result).toBeNull();
    })

    it('should return the expected number', () => {
      // Arrange
      const mockedWorkItemRelation = { target: { id: 1 } } as ApiModel.WorkItemRelation;
      const expectedResult: number = mockedWorkItemRelation.target.id;

      // Act
      const result = mappers.mapWorkItemRelationApiModelToVM(mockedWorkItemRelation);

      // Assert
      expect(result).toEqual(expectedResult);
    })
  })
})
