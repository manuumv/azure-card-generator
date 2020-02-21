import * as React from 'react';
import { Container, Typography } from '@material-ui/core';
import { SelectComponent, CardComponent } from '../common/components';
import { Sprint, Team, WorkItem } from '../model';
import { getWorkItemRelations, getSprints, getTeams, getWorkItems } from './services';
import { mapTeamsApiModelToVM, mapSprintsApiModelToVM, mapWorkItemsApiModelToVM } from './mappers';
import { mapWorkItemRelationsApiModelToVM } from './mappers/mapWorkItemRelationsApiToVM';
import { CardContainer } from './cardGenerator.container.styles';

export const CardGeneratorContainer: React.FunctionComponent = () => {
  const [teams, setTeams] = React.useState<Team[]>();
  const [sprints, setSprints] = React.useState<Sprint[]>();
  const [workItems, setWorkItems] = React.useState<WorkItem[]>();

  const [selectedTeam, setSelectedTeam] = React.useState<string | number>('');
  const [selectedSprint, setSelectedSprint] = React.useState<string | number>('');

  React.useEffect(() => {
    getTeams()
      .then((teamsResponse) => setTeams(mapTeamsApiModelToVM(teamsResponse)))
      .catch(console.log);
  }, []);

  React.useEffect(() => {
    if (selectedTeam) {
      getSprints(teams[selectedTeam].id)
        .then((sprintsResponse) => setSprints(mapSprintsApiModelToVM(sprintsResponse)))
        .catch(console.log);
    }

    setWorkItems([]);
    setSprints([]);
    setSelectedSprint('');
  }, [selectedTeam]);

  React.useEffect(() => {
    if (selectedTeam && selectedSprint) {
      getWorkItemRelations(teams[selectedTeam].id, sprints[selectedSprint].id)
        .then((workItemRelations) => {
          const workItemIds = mapWorkItemRelationsApiModelToVM(workItemRelations);
          getWorkItems(workItemIds).then((workItems) => setWorkItems(mapWorkItemsApiModelToVM(workItems)));
        })
        .catch(console.log);
    }
  }, [selectedTeam, selectedSprint]);

  return (
    <Container>
      <Typography variant="h4">AZURE DEVOPS CARD GENERATOR</Typography>
      <SelectComponent
        id="teams"
        label="Teams:"
        values={teams}
        selectedValue={selectedTeam}
        onChangeOption={setSelectedTeam}
      />
      <SelectComponent
        id="sprints"
        label="Sprints:"
        values={sprints}
        selectedValue={selectedSprint}
        onChangeOption={setSelectedSprint}
      />
      <CardContainer>
        {
          Array.isArray(workItems) &&
          workItems.map((workItem, index) => (
            <CardComponent key={index} teamName={teams[selectedTeam].name} workItem={workItem} />
          ))
        }
      </CardContainer>
    </Container>
  )
}
