import * as React from "react";
import { Container, Button } from "@material-ui/core";
import { SpinnerComponent } from "common/components/spinner";
import { filterStates, filterWorkItems } from "./cardGenerator.container.business";
import { FilterComponent, SelectOptionsComponent, TopBarComponent, CardPageComponent } from "./components";
import { Loading, Project, Sprint, Team, WorkItem } from "./viewmodel";

export const CardGeneratorContainer: React.FunctionComponent = () => {
  const [projects, setProjects] = React.useState<Project[]>();
  const [teams, setTeams] = React.useState<Team[]>();
  const [sprints, setSprints] = React.useState<Sprint[]>();
  const [workItems, setWorkItems] = React.useState<WorkItem[]>();
  const [teamName, setTeamName] = React.useState<string>("");
  const [filters, setFilters] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState<Loading>({
    projects: false,
    teams: false,
    sprints: false,
    workItems: false,
  });

  const componentToPrintRef = React.useRef();

  const onChangeProject = React.useCallback(setProjects, [projects]);
  const onChangeTeam = React.useCallback(setTeams, [projects, teams]);
  const onChangeSprint = React.useCallback((sprints: Sprint[], teamName: string) => {
    setTeamName(teamName);
    setSprints(sprints);
  }, [projects, teams, sprints, teamName]);
  const onChangeWorkItems = React.useCallback(setWorkItems, [workItems]);
  const handleChangeFilters = React.useCallback(({ target: { value } }: React.ChangeEvent<{ value: string[] }>) => {
    setFilters(value);
  }, [filters]);
  const changeIsLoading = React.useCallback((textfield: 'projects' | 'teams' | 'sprints' | 'workItems', value: boolean) => {
    setIsLoading({ ...isLoading, [textfield]: value });
  }, [isLoading]);

  const states = React.useMemo(() => {
    const filteredStates = filterStates(workItems);
    setFilters(filteredStates);
    return filteredStates;
  }, [workItems]);

  const filteredWorkItems = React.useMemo(() => filterWorkItems(workItems, filters), [filters, states, workItems]);

  const reactToPrintContent = () => componentToPrintRef.current;
  const reactToPrintTrigger = () => (
    <Button disabled={!(Array.isArray(workItems) && workItems.length > 0)} variant="outlined">
      Print
    </Button>
  );

  return (
    <>
      <TopBarComponent />
      <Container>
        <SelectOptionsComponent
          teams={teams}
          sprints={sprints}
          projects={projects}
          isLoading={isLoading}
          onChangeProject={onChangeProject}
          onChangeTeam={onChangeTeam}
          onChangeSprint={onChangeSprint}
          onChangeWorkItems={onChangeWorkItems}
          reactToPrintTrigger={reactToPrintTrigger}
          reactToPrintContent={reactToPrintContent}
          changeIsLoading={changeIsLoading}
        />
        <FilterComponent
          states={states}
          filters={filters}
          handleChangeFilters={handleChangeFilters}
        />
        <SpinnerComponent isLoading={isLoading.workItems}>
          <div ref={componentToPrintRef}>
            <CardPageComponent
              workItems={filteredWorkItems}
              teamName={teamName}
            />
          </div>
        </SpinnerComponent>
      </Container>
    </>
  );
};
