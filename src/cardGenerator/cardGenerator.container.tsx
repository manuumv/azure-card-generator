import * as React from 'react';
import { Container, Button, AppBar } from '@material-ui/core';
import { SelectComponent, CardComponent } from '../common/components';
import { Sprint, Team, WorkItem } from '../model/view';
import { getWorkItemRelations, getSprints, getTeams, getWorkItems } from './services';
import { mapTeamsApiModelToVM, mapSprintsApiModelToVM, mapWorkItemsApiModelToVM } from './mappers';
import { mapWorkItemRelationsApiModelToVM } from './mappers/mapWorkItemRelationsApiModelToVM/mapWorkItemRelationsApiToVM';
import { CardContainer, SelectContainer, Title } from './cardGenerator.container.styles';
import ReactToPrint from 'react-to-print';
import CssBaseline from '@material-ui/core/CssBaseline';

export const CardGeneratorContainer: React.FunctionComponent = () => {
  const [teams, setTeams] = React.useState<Team[]>();
  const [sprints, setSprints] = React.useState<Sprint[]>();
  const [workItems, setWorkItems] = React.useState<WorkItem[]>();

  const [selectedTeam, setSelectedTeam] = React.useState<string | number>('');
  const [selectedSprint, setSelectedSprint] = React.useState<string | number>('');

  const componentToPrintRef = React.useRef();

  const reactToPrintContent = () => componentToPrintRef.current;

  const reactToPrintTrigger = () => (
    <Button disabled={!(Array.isArray(workItems) && workItems.length > 0)} variant="outlined">Print !</Button>
  );

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
    <>
      <CssBaseline />
      <AppBar position="relative" >
        <Title variant="h4">AZURE CARD GENERATOR</Title>
      </AppBar>
      <Container>
        <SelectContainer>
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
          <ReactToPrint
            trigger={reactToPrintTrigger}
            content={reactToPrintContent}
          />
        </SelectContainer>
        <CardContainer ref={componentToPrintRef}>
          {
            Array.isArray(workItems) &&
            workItems.map((workItem, index) => (
              <CardComponent key={index} teamName={teams[selectedTeam].name} workItem={workItem} />
            ))
          }
        </CardContainer>
      </Container >
    </>
  )
}
