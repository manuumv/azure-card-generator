import * as React from 'react';
import { SelectComponent, SpinnerComponent } from 'common/components';
import { mapToSelectOptions } from 'common/mappers';
import { getTeams, getProjects } from 'api/rest';
import { UserSessionService } from 'common/services';
import { isNumber } from 'common/utils';
import { mapTeamsApiModelToVM, mapProjectsApiModelToVM } from '../../../mappers';
import { Project, Team } from '../../../viewmodel';
import { SnackbarContext } from 'common/providers';

interface Props {
  projects: Project[];
  isLoading: boolean;
  selectedProject: string | number;
  setSelectedProject: (value: string | number) => void;
  onChangeProject: (projects: Project[]) => void;
  onChangeTeam: (teams: Team[]) => void;
  changeIsLoading: (value: boolean) => void;
}

export const SelectProjectComponent: React.FunctionComponent<Props> = (props) => {
  const { useSnackbar } = React.useContext(SnackbarContext);

  const organization = UserSessionService.get()?.organization;

  React.useEffect(() => { loadProjects(); }, []);

  const loadProjects = async () => {
    try {
      props.changeIsLoading(true);
      const projects = await getProjects(organization);
      props.onChangeProject(mapProjectsApiModelToVM(projects));
    } catch (error) {
      useSnackbar(error, 'error');
    } finally {
      props.changeIsLoading(false);
    }
  }

  const onChangeProject = async (value: string | number) => {
    props.setSelectedProject(value);
    if (isNumber) {
      try {
        props.changeIsLoading(true);
        const teams = await getTeams(organization, props.projects[value].name);
        props.onChangeTeam(mapTeamsApiModelToVM(teams))
      } catch (error) {
        useSnackbar(error, 'error');
      } finally {
        props.changeIsLoading(false);
      }
    }
  }

  return (
    <SpinnerComponent displayChildren={true} isLoading={props.isLoading}>
      <SelectComponent
        id="projects"
        label="Projects:"
        values={mapToSelectOptions<Project>(props.projects, 'name')}
        selectedValue={props.selectedProject}
        onChangeOption={onChangeProject}
        disabled={props.isLoading}
      />
    </SpinnerComponent>
  )
}
