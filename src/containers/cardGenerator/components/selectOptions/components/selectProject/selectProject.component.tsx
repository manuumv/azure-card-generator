import * as React from 'react';
import { SelectComponent, SpinnerComponent } from 'common/components';
import { mapToSelectOptions } from 'common/mappers';
import { getTeams, getProjects } from 'api/rest';
import { UserSessionService } from 'common/services';
import { isNumber } from 'common/utils';
import {
  mapTeamsApiModelToVM,
  mapProjectsApiModelToVM,
} from '../../../../mappers';
import { Project, Team } from '../../../../viewmodel';
import { SnackbarContext } from 'common/providers';

interface Props {
  projects: Project[];
  selectedProject: string | number;
  setSelectedProject: (value: string | number) => void;
  onChangeProject: (projects: Project[]) => void;
  onChangeTeam: (teams: Team[]) => void;
}

export const SelectProjectComponent: React.FunctionComponent<Props> = (
  props
) => {
  const { useSnackbar } = React.useContext(SnackbarContext);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const organization = UserSessionService.get()?.organization;

  React.useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const projects = await getProjects(organization);
      props.onChangeProject(mapProjectsApiModelToVM(projects));
    } catch (error) {
      useSnackbar(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeProject = async (value: string | number) => {
    try {
      props.setSelectedProject(value);
      if (!isNumber(value)) {
        props.onChangeTeam([]);
        return;
      }

      setIsLoading(true);
      const teams = await getTeams(organization, props.projects[value].name);
      props.onChangeTeam(mapTeamsApiModelToVM(teams));
    } catch (error) {
      useSnackbar(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SpinnerComponent isLoading={isLoading}>
      <SelectComponent
        id="projects"
        label="Projects:"
        values={mapToSelectOptions<Project>(props.projects, "name")}
        selectedValue={props.selectedProject}
        onChangeOption={onChangeProject}
        disabled={isLoading}
      />
    </SpinnerComponent>
  );
};
