import * as React from "react";
import { Button, Container } from "@material-ui/core";
import { Project, Sprint, Team, WorkItem } from "./viewmodel";
import { TopBarComponent } from "./components/topBar";
import { CardPageComponent } from "./components/card/cardPage.component";
import { FilterComponent } from "./components/filter";
import { SelectOptionsComponent } from "./components/selectOptions";
import { mapProjectsApiModelToVM } from "./mappers";
import { getProjects } from "../../common/services/api";
import { UserSessionService } from "../../common/services/storage";
import { SpinnerComponent } from "../../common/components/spinner";
import { filterStates, getFilteredWorkItems } from "./cardGenerator.container.business";
import { SnackbarContext } from "../../common/providers";

export const CardGeneratorContainer: React.FunctionComponent = () => {
  const [projects, setProjects] = React.useState<Project[]>();
  const [teams, setTeams] = React.useState<Team[]>();
  const [sprints, setSprints] = React.useState<Sprint[]>();
  const [workItems, setWorkItems] = React.useState<WorkItem[]>();
  const [teamName, setTeamName] = React.useState<string>("");
  const [filters, setFilters] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState({
    projects: false,
    teams: false,
    sprints: false,
    workItems: false,
  });

  const { useSnackbar } = React.useContext(SnackbarContext)

  const componentToPrintRef = React.useRef();
  const reactToPrintContent = () => componentToPrintRef.current;
  const reactToPrintTrigger = () => (
    <Button
      disabled={!(Array.isArray(workItems) && workItems.length > 0)}
      variant="outlined"
    >
      Print
    </Button>
  );

  const organization = UserSessionService.get()?.organization;

  React.useEffect(() => {
    setIsLoading({ ...isLoading, projects: true });
    getProjects(organization)
      .then(projectsResponse => {
        setProjects(mapProjectsApiModelToVM(projectsResponse));
        setIsLoading({ ...isLoading, projects: false });
      })
      .catch((error) => {
        useSnackbar(error.message, 'error');
        setIsLoading({ ...isLoading, projects: false });
      });
  }, []);

  const handleChangeTeam = React.useCallback(setTeams, [projects, teams]);
  const handleChangeSprint = React.useCallback((sprints: Sprint[], teamName: string) => {
    setTeamName(teamName);
    setSprints(sprints);
  }, [projects, teams, sprints, teamName]);
  const handleChangeWorkItems = React.useCallback(setWorkItems, [workItems]);
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

  const filteredWorkItems = React.useMemo(() => getFilteredWorkItems(workItems, filters), [filters, states, workItems]);

  return (
    <>
      <TopBarComponent />
      <Container>
        <SelectOptionsComponent
          teams={teams}
          sprints={sprints}
          projects={projects}
          isLoading={isLoading}
          handleChangeTeam={handleChangeTeam}
          handleChangeSprint={handleChangeSprint}
          handleChangeWorkItems={handleChangeWorkItems}
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
