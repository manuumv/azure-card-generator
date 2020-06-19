import { getSprints, getTeams, getWorkItemRelations, getWorkItems } from './azure';
import * as httpHelper from 'common/utils/httpHelper/httpHelper';
import * as endpoints from './endpoints';

describe('cardGenerator services', () => {
  describe('getTeams', () => {
    it('should be called with the expected arguments', async () => {
      // Arrange
      const organization = 'testOrganization';
      const projectName = 'testProject';
      const spyGet = jest.spyOn(httpHelper, 'get').mockImplementation(jest.fn());
      const mockedEndpoint = 'testEndpoint';
      const spyTeamsEndpoint = jest.spyOn(endpoints, 'teamsEndpoint').mockReturnValue(mockedEndpoint);

      // Act
      await getTeams(organization, projectName);

      // Assert
      expect(spyGet).toHaveBeenCalledWith(mockedEndpoint);
      expect(spyTeamsEndpoint).toHaveBeenCalledWith(organization, projectName);
    })
  });

  describe('getSprints', () => {
    it('should be called with the expected arguments', async () => {
      // Arrange
      const organization = 'testOrganization';
      const projectName = 'testProject';
      const teamId = '1';
      const spyGet = jest.spyOn(httpHelper, 'get').mockImplementation(jest.fn());
      const mockedEndpoint = 'testEndpoint';
      const spySprintEndpoint = jest.spyOn(endpoints, 'sprintEndpoint').mockReturnValue(mockedEndpoint);

      // Act
      await getSprints(organization, projectName, teamId);

      // Assert
      expect(spyGet).toHaveBeenCalledWith(mockedEndpoint);
      expect(spySprintEndpoint).toHaveBeenCalledWith(organization, projectName, teamId);
    })
  });

  describe('getWorkItemRelations', () => {
    it('should be called with the expected arguments', async () => {
      // Arrange
      const organization = 'testOrganization';
      const projectName = 'testProject';
      const teamId = 'teamid';
      const iterationId = 'iterationId';
      const spyGet = jest.spyOn(httpHelper, 'get').mockImplementation(jest.fn());
      const mockedEndpoint = 'testEndpoint';
      const spyIterationEndpoint = jest.spyOn(endpoints, 'iterationEndpoint').mockReturnValue(mockedEndpoint);

      // Act
      await getWorkItemRelations(organization, projectName, teamId, iterationId);

      // Assert
      expect(spyGet).toHaveBeenCalledWith(mockedEndpoint);
      expect(spyIterationEndpoint).toHaveBeenCalledWith(organization, projectName, teamId, iterationId);
    })
  });

  describe('getWorkItems', () => {
    it('should be called with the expected arguments', async () => {
      // Arrange
      const organization = 'testOrganization';
      const projectName = 'testProject';
      const workItemsIds = [1, 2]
      const spyGet = jest.spyOn(httpHelper, 'get').mockImplementation(jest.fn());
      const mockedEndpoint = 'testEndpoint';
      const spyWorkItemsEndpoint = jest.spyOn(endpoints, 'workItemsEndpoint').mockReturnValue(mockedEndpoint);

      // Act
      await getWorkItems(organization, projectName, workItemsIds);

      // Assert
      expect(spyGet).toHaveBeenCalledWith(mockedEndpoint);
      expect(spyWorkItemsEndpoint).toHaveBeenCalledWith(organization, projectName, workItemsIds);
    })
  });
});
