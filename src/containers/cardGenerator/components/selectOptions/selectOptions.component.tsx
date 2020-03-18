import * as React from 'react';
import { SelectComponent } from '../../../../common/components/select';
import ReactToPrint, { ITriggerProps } from 'react-to-print';
import { SelectContainer } from './selectOptions.component.styles';
import { Team, Sprint, Project, WorkItem } from '../../../../model/view';
import { isNumber } from '../../../../common/utils';
import { getTeams, getSprints, getWorkItemRelations, getWorkItems } from '../../services';
import { mapTeamsApiModelToVM, mapSprintsApiModelToVM, mapWorkItemRelationsApiModelToVM, mapWorkItemsApiModelToVM } from '../../mappers';
import { UserService } from '../../../../common/services';
import { mapToSelectOptions } from '../../../../common/mappers';
import { SpinnerComponent } from '../../../../common/components/spinner';

interface Props {
  teams: Team[];
  sprints: Sprint[];
  projects: Project[];
  isLoading: {
    projects: boolean,
    teams: boolean,
    sprints: boolean,
    workItems: boolean,
  },
  handleChangeTeam: (team: Team[]) => void;
  handleChangeSprint: (sprints: Sprint[], teamName: string) => void;
  handleChangeWorkItems: (workItems: WorkItem[]) => void;
  reactToPrintTrigger: <T>() => React.ReactElement<ITriggerProps<T>>;
  reactToPrintContent: () => React.ReactInstance;
  changeIsLoading: (textfield: 'projects' | 'teams' | 'sprints' | 'workItems', value: boolean) => void;
}

export const SelectOptionsComponent: React.FunctionComponent<Props> = (props) => {
  const [selectedProject, setSelectedProject] = React.useState<string | number>('');
  const [selectedTeam, setSelectedTeam] = React.useState<string | number>('');
  const [selectedSprint, setSelectedSprint] = React.useState<string | number>('');
  const organization = UserService.get()?.organization;

  React.useEffect(() => {
    setSelectedTeam('');
    setSelectedSprint('');
    props.handleChangeSprint(null, '');
    props.handleChangeWorkItems(null);
  }, [selectedProject]);

  React.useEffect(() => {
    setSelectedSprint('');
    props.handleChangeWorkItems(null)
  }, [selectedTeam]);


  const onSelectProject = (value: string | number) => {
    setSelectedProject(value);
    if (isNumber(value)) {
      props.changeIsLoading('teams', true);
      getTeams(organization, props.projects[value].name)
        .then((teamsResponse) => {
          props.handleChangeTeam(mapTeamsApiModelToVM(teamsResponse))
          props.changeIsLoading('teams', false);
        })
        .catch((error) => {
          console.log(error);
          props.changeIsLoading('teams', false);
        });
    }
  }

  const onSelectTeam = (value: string | number) => {
    setSelectedTeam(value);
    if (isNumber(value)) {
      props.changeIsLoading('sprints', true);
      getSprints(organization, props.projects[selectedProject].name, props.teams[value].id)
        .then((sprintsResponse) => {
          props.handleChangeSprint(mapSprintsApiModelToVM(sprintsResponse), props.teams[value].name)
          props.changeIsLoading('sprints', false);
        })
        .catch((error) => {
          console.log(error);
          props.changeIsLoading('sprints', false);
        });
    }
  }

  const onSelectSprint = (value: string | number) => {
    setSelectedSprint(value);
    if (isNumber(value)) {
      props.changeIsLoading('workItems', true);
      getWorkItemRelations(organization, props.projects[selectedProject].name, props.teams[selectedTeam].id, props.sprints[value].id)
        .then((workItemRelations) => {
          const workItemIds = mapWorkItemRelationsApiModelToVM(workItemRelations);
          getWorkItems(organization, props.projects[selectedProject].name, workItemIds).then((workItems) => {
            props.handleChangeWorkItems(mapWorkItemsApiModelToVM(workItems));
          });
          props.changeIsLoading('workItems', false);
        })
        .catch((error) => {
          console.log(error);
          props.changeIsLoading('workItems', false);
        });
    }
  }

  return (
    <SelectContainer>
      <SpinnerComponent displayChildren={true} isLoading={props.isLoading.projects}>
        <SelectComponent
          id="projects"
          label="Projects:"
          values={mapToSelectOptions<Project>(props.projects, 'name')}
          selectedValue={selectedProject}
          onChangeOption={onSelectProject}
          disabled={props.isLoading.projects}
        />
      </SpinnerComponent>
      <SpinnerComponent displayChildren={true} isLoading={props.isLoading.teams}>
        <SelectComponent
          id="teams"
          label="Teams:"
          values={mapToSelectOptions<Team>(props.teams, 'name')}
          selectedValue={selectedTeam}
          onChangeOption={onSelectTeam}
          disabled={props.isLoading.teams}
        />
      </SpinnerComponent>
      <SpinnerComponent displayChildren={true} isLoading={props.isLoading.sprints}>
        <SelectComponent
          id="sprints"
          label="Sprints:"
          values={mapToSelectOptions<Sprint>(props.sprints, 'name')}
          selectedValue={selectedSprint}
          onChangeOption={onSelectSprint}
          disabled={props.isLoading.sprints}
        />
      </SpinnerComponent>
      <ReactToPrint
        trigger={props.reactToPrintTrigger}
        content={props.reactToPrintContent}
      />
    </SelectContainer>
  )
}
