import * as React from 'react';
import { SelectComponent } from '../../../../common/components/select';
import ReactToPrint, { ITriggerProps } from 'react-to-print';
import { SelectContainer } from './selectOptions.component.styles';
import { Team, Sprint, Project, WorkItem } from '../../../../model/view';
import { isNumber } from '../../../../common/utils';
import { getTeams, getSprints, getWorkItemRelations, getWorkItems } from '../../services';
import { mapTeamsApiModelToVM, mapSprintsApiModelToVM, mapWorkItemRelationsApiModelToVM, mapWorkItemsApiModelToVM } from '../../mappers';
import { UserService } from '../../../../common/services';

interface Props {
  teams: Team[];
  sprints: Sprint[];
  projects: Project[];
  handleChangeTeam: (team: Team[]) => void;
  handleChangeSprint: (sprints: Sprint[], teamName: string) => void;
  handleChangeWorkItems: (workItems: WorkItem[]) => void;
  reactToPrintTrigger: <T>() => React.ReactElement<ITriggerProps<T>>;
  reactToPrintContent: () => React.ReactInstance;
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
    if (!isNumber(selectedTeam)) {
      setSelectedSprint('');
      props.handleChangeWorkItems(null)
    }
  }, [selectedTeam]);


  const onSelectProject = (value: string | number) => {
    setSelectedProject(value);
    if (isNumber(value)) {
      getTeams(organization, props.projects[value].name)
        .then((teamsResponse) => props.handleChangeTeam(mapTeamsApiModelToVM(teamsResponse)))
        .catch(console.log);
    }
  }

  const onSelectTeam = (value: string | number) => {
    setSelectedTeam(value);
    if (isNumber(value)) {
      getSprints(organization, props.projects[selectedProject].name, props.teams[value].id)
        .then((sprintsResponse) => props.handleChangeSprint(mapSprintsApiModelToVM(sprintsResponse), props.teams[value].name))
        .catch(console.log);
    }
  }

  const onSelectSprint = (value: string | number) => {
    setSelectedSprint(value);
    if (isNumber(value)) {
      getWorkItemRelations(organization, props.projects[selectedProject].name, props.teams[selectedTeam].id, props.sprints[value].id)
        .then((workItemRelations) => {
          const workItemIds = mapWorkItemRelationsApiModelToVM(workItemRelations);
          getWorkItems(organization, props.projects[selectedProject].name, workItemIds).then((workItems) => {
            props.handleChangeWorkItems(mapWorkItemsApiModelToVM(workItems));
          });
        })
        .catch(console.log);
    }
  }

  return (
    <SelectContainer>
      <SelectComponent
        id="projects"
        label="Projects:"
        values={props.projects}
        selectedValue={selectedProject}
        onChangeOption={onSelectProject}
      />
      <SelectComponent
        id="teams"
        label="Teams:"
        values={props.teams}
        selectedValue={selectedTeam}
        onChangeOption={onSelectTeam}
      />
      <SelectComponent
        id="sprints"
        label="Sprints:"
        values={props.sprints}
        selectedValue={selectedSprint}
        onChangeOption={onSelectSprint}
      />
      <ReactToPrint
        trigger={props.reactToPrintTrigger}
        content={props.reactToPrintContent}
      />
    </SelectContainer>
  )
}
