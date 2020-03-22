import * as httpHelper from '../../utils/httpHelper';
import { getSprints, getTeams, getWorkItemRelations, getWorkItems } from './azure';
import * endpoints from './endpoints';

describe('cardGenerator services', () => {
  describe('getTeams', () => {
    it('should be called with the expected arguments', async () => {
      // Arrange
      const spyGet = jest.spyOn(httpHelper, 'get').mockImplementation(jest.fn());

      // Act
      await getTeams();

      // Assert
      expect(spyGet).toHaveBeenCalledWith(endpoints.teamsEndpoint);
    })
  });

  describe('getSprints', () => {
    it('should be called with the expected arguments', async () => {
      // Arrange
      const organization = 'testOrganization';
      const projectName = 'testProject';
      const teamId = '1';
      const spyGet = jest.spyOn(httpHelper, 'get').mockImplementation(jest.fn());
      const spySprintEndpoint = jest.spyOn(endpoints, 'sprintEndpoint');

      // Act
      await getSprints(organization, projectName, teamId);

      // Assert
      expect(spyGet).toHaveBeenCalledWith(endpoints.sprintEndpoint(teamId));
      expect(spySprintEndpoint).toHaveBeenCalledWith(organization, projectName, teamId);
    })
  });

  describe('getWorkItemRelations', () => {
    it('should be called with the expected arguments', async () => {
      // Arrange
      const teamId = 'teamid';
      const iterationId = 'iterationId';
      const spyGet = jest.spyOn(httpHelper, 'get').mockImplementation(jest.fn());

      // Act
      await getWorkItemRelations(teamId, iterationId);

      // Assert
      expect(spyGet).toHaveBeenCalledWith(iterationEndpoint(teamId, iterationId));
    })
  });

  describe('getWorkItems', () => {
    it('should be called with the expected arguments', async () => {
      // Arrange
      const workItemsIds = [1, 2]
      const spyGet = jest.spyOn(httpHelper, 'get').mockImplementation(jest.fn());

      // Act
      await getWorkItems(workItemsIds);

      // Assert
      expect(spyGet).toHaveBeenCalledWith(workItemsEndpoint(workItemsIds));
    })
  });
});
