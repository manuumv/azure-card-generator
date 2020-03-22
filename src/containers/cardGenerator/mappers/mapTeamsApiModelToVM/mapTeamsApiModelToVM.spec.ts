import * as mappers from './mapTeamsApiModelToVM';
import * as ApiModel from "api/model";
import * as ViewModel from "../../viewmodel";

describe('mapTeamsApiModelToVM', () => {
  describe('mapTeamsApiModelToVM', () => {
    it('should return an empty array if teams are null', () => {
      // Arrange
      const teamCollection: ApiModel.TeamCollection = {
        value: null,
        count: 10,
      };
      const expectedResult: ViewModel.Team[] = [];

      // Act
      const result = mappers.mapTeamsApiModelToVM(teamCollection);

      // Assert
      expect(result).toEqual(expectedResult);
    })

    it('should call mapTeamApiModelToVM and return the expected teams array', () => {
      // Arrange
      const mockedTeam = { id: '1' } as ApiModel.Team;
      const teamCollection: ApiModel.TeamCollection = {
        value: [mockedTeam],
        count: 1,
      };
      const expectedMockedTeam = { id: mockedTeam.id } as ViewModel.Team;
      const expectedResult: ViewModel.Team[] = [expectedMockedTeam];
      const spyMapSprintApiModelToVM = jest.spyOn(mappers, 'mapTeamApiModelToVM').mockReturnValue(expectedMockedTeam);

      // Act
      const result = mappers.mapTeamsApiModelToVM(teamCollection);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(spyMapSprintApiModelToVM).toHaveBeenCalledWith(mockedTeam, 0, [mockedTeam]);
    })
  })

  describe('mapTeamApiModelToVM', () => {
    it('should return an empty array if team is null', () => {
      // Arrange
      const mockedTeam: ViewModel.Team = null;

      // Act
      const result = mappers.mapTeamApiModelToVM(mockedTeam);

      // Assert
      expect(result).toBeNull();
    })

    it('should return the expected team object', () => {
      // Arrange
      const mockedTeam = { id: '1' } as ApiModel.Team;
      const expectedResult = { id: mockedTeam.id } as ViewModel.Team;

      // Act
      const result = mappers.mapTeamApiModelToVM(mockedTeam);

      // Assert
      expect(result).toEqual(expectedResult);
    })
  })
})
