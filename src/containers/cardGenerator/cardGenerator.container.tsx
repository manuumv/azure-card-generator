import * as React from 'react';
import { AppBar, Button, Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Project, Sprint, Team, WorkItem } from '../../model/view';
import { Title } from './cardGenerator.container.styles';
import { CardPageComponent } from './components/card/cardPage.component';
import { FilterComponent } from './components/filter';
import { SelectOptionsComponent } from './components/selectOptions';
import { mapProjectsApiModelToVM } from './mappers';
import { getProjects } from './services';
import { uniq, splitEvery } from 'ramda';

export const CardGeneratorContainer: React.FunctionComponent = () => {
  const [projects, setProjects] = React.useState<Project[]>();
  const [teams, setTeams] = React.useState<Team[]>();
  const [sprints, setSprints] = React.useState<Sprint[]>();
  const [workItems, setWorkItems] = React.useState<WorkItem[]>();
  const [teamName, setTeamName] = React.useState<string>('');
  const [filters, setFilters] = React.useState<string[]>([]);

  const componentToPrintRef = React.useRef();
  const reactToPrintContent = () => componentToPrintRef.current;
  const reactToPrintTrigger = () => (
    <Button disabled={!(Array.isArray(workItems) && workItems.length > 0)} variant="outlined">Print</Button>
  );

  React.useEffect(() => {
    getProjects()
      .then((projectsResponse) => setProjects(mapProjectsApiModelToVM(projectsResponse)))
      .catch(console.log);
  }, []);

  const handleChangeTeam = React.useCallback((setTeams), [projects, teams]);
  const handleChangeSprint = React.useCallback(((sprints: Sprint[], teamName: string) => {
    setTeamName(teamName);
    setSprints(sprints);
  }), [projects, teams, sprints, teamName]);
  const handleChangeWorkItems = React.useCallback((setWorkItems), [workItems]);
  const handleChangeFilters = React.useCallback(((event: React.ChangeEvent<{ name?: string; value: string[] }>) => {
    setFilters(event.target.value)
  }), [filters]);

  const states = React.useMemo(() => {
    if(workItems) {
      const states = uniq(workItems.flat().map(({ state }) => state));
      setFilters(states);
      return states;
    }
  }, [workItems]);

  const filteredWorkItems = React.useMemo(() => {
    const filterWorkItems = workItems && workItems.filter((workItem) => filters.includes(workItem.state));
    const paginatedWorkItems = filterWorkItems && splitEvery(10, filterWorkItems);
    return paginatedWorkItems;
  }, [filters,states, workItems]);

  return (
    <>
      <CssBaseline />
      <AppBar position="relative" >
        <Title variant="h4">AZURE CARD GENERATOR</Title>
      </AppBar>
      <Container>
        <SelectOptionsComponent
          teams={teams}
          sprints={sprints}
          projects={projects}
          handleChangeTeam={handleChangeTeam}
          handleChangeSprint={handleChangeSprint}
          handleChangeWorkItems={handleChangeWorkItems}
          reactToPrintTrigger={reactToPrintTrigger}
          reactToPrintContent={reactToPrintContent}
        />
        <FilterComponent states={states} filters={filters} handleChangeFilters={handleChangeFilters} />
        <div ref={componentToPrintRef}>
          <CardPageComponent workItems={filteredWorkItems} teamName={teamName} />
        </div>
      </Container >
    </>
  )
}

