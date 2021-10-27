import * as React from 'react';
import { Container } from '@material-ui/core';
import { filterStates } from './cardGenerator.container.business';
import { FilterComponent, SelectOptionsComponent, TopBarComponent, CardPageComponent } from './components';
import { Project, Sprint, Team, WorkItem } from './viewmodel';
import { OptionsContainer } from './cardGenerator.container.styles';

export const CardGeneratorContainer: React.FunctionComponent = () => {
  const [projects, setProjects] = React.useState<Project[]>();
  const [teams, setTeams] = React.useState<Team[]>();
  const [sprints, setSprints] = React.useState<Sprint[]>();
  const [workItems, setWorkItems] = React.useState<WorkItem[]>();
  const [teamName, setTeamName] = React.useState<string>('');
  const [filters, setFilters] = React.useState<string[]>([]);

  const componentToPrintRef = React.useRef();

  const onChangeProject = React.useCallback(setProjects, [projects]);
  const onChangeTeam = React.useCallback(setTeams, [projects, teams]);
  const onChangeSprint = React.useCallback((sprints: Sprint[], teamName: string): void => {
    setTeamName(teamName);
    setSprints(sprints);
  }, [projects, teams, sprints, teamName]);
  const onChangeWorkItems = React.useCallback(setWorkItems, [workItems]);
  const handleChangeFilters = React.useCallback(({ target: { value } }: React.ChangeEvent<{ value: string[] }>) => {
    setFilters(value);
  }, [filters]);
  const states = React.useMemo(() => {
    const filteredStates = filterStates(workItems);
    setFilters(filteredStates);
    return filteredStates;
  }, [workItems]);

  const isDisabledPrintButton = !(Array.isArray(workItems) && workItems.length > 0);
  return (
    <>
      <TopBarComponent />
      <OptionsContainer>
        <SelectOptionsComponent
          teams={teams}
          sprints={sprints}
          projects={projects}
          onChangeProject={onChangeProject}
          onChangeTeam={onChangeTeam}
          onChangeSprint={onChangeSprint}
          onChangeWorkItems={onChangeWorkItems}
          componentToPrintRef={componentToPrintRef}
          isDisabledPrintButton={isDisabledPrintButton}
        />
        <FilterComponent
          states={states}
          filters={filters}
          handleChangeFilters={handleChangeFilters}
        />
      </OptionsContainer>
      <Container>
        <div ref={componentToPrintRef}>
          <CardPageComponent
            workItems={workItems}
            teamName={teamName}
            filters={filters}
          />
        </div>
      </Container>
    </>
  );
};
