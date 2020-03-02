import * as httpHelper from '../../../common/utils/httpHelper';
import { getSprints, getTeams, getWorkItemRelations, getWorkItems } from './cardGenerator.services';
import { teamsEndpoint, sprintEndpoint, iterationEndpoint, workItemsEndpoint } from './endpoints';

describe('cardGenerator services', () => {
  describe('getTeams', () => {
    it('should be called with the expected arguments', async () => {
      // Arrange
      const spyGet = jest.spyOn(httpHelper, 'get').mockImplementation(jest.fn());

      // Act
      await getTeams();

      // Assert
      expect(spyGet).toHaveBeenCalledWith(teamsEndpoint);
    })
  });

  describe('getSprints', () => {
    it('should be called with the expected arguments', async () => {
      // Arrange
      const sprintId = '1';
      const spyGet = jest.spyOn(httpHelper, 'get').mockImplementation(jest.fn());

      // Act
      await getSprints(sprintId);

      // Assert
      expect(spyGet).toHaveBeenCalledWith(sprintEndpoint(sprintId));
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
