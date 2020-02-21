import * as React from 'react';
import { Container, Typography } from '@material-ui/core';
import { SelectComponent, CardComponent } from '../common/components';
import { Sprint, Team, WorkItem } from '../model';
import { getWorkItemRelations, getSprints, getTeams, getWorkItems } from './services';

export const CardGeneratorContainer: React.FunctionComponent = () => {
  const [teams, setTeams] = React.useState<Team[]>();
  const [sprints, setSprints] = React.useState<Sprint[]>();
  const [workItems, setWorkItems] = React.useState<WorkItem[]>();

  const [selectedTeam, setSelectedTeam] = React.useState<string | number>('');
  const [selectedSprint, setSelectedSprint] = React.useState<string | number>('');

  React.useEffect(() => {
    getTeams()
      .then((res) => setTeams(res.value))
      .catch(console.log);
  }, []);

  React.useEffect(() => {
    if (selectedTeam) {
      getSprints(teams[selectedTeam].id)
        .then((res) => setSprints(res.value))
        .catch(console.log);
    }

    setWorkItems([]);
    setSprints([]);
    setSelectedSprint('');
  }, [selectedTeam]);

  React.useEffect(() => {
    if (selectedTeam && selectedSprint) {
      getWorkItemRelations(teams[selectedTeam].id, sprints[selectedSprint].id)
        .then((res) => {
          const ids = res.workItemRelations.map((iteration) => iteration.target.id);
          getWorkItems(ids).then((workItems) => setWorkItems(workItems.value));
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
      {
        Array.isArray(workItems) &&
        workItems.map((workItem, index) => (
          <CardComponent key={index} teamName={teams[selectedTeam].name} workItem={workItem} />
        ))
      }
    </Container>
  )
}
