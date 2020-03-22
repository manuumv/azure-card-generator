import * as React from 'react';
import ReactToPrint from 'react-to-print';
import { Loading, LoadingKeys, Project, Sprint, Team, WorkItem } from '../../viewmodel';
import { SelectContainer } from './selectOptions.component.styles';
import { SelectProjectComponent } from './components/selectProject.component';
import { SelectTeamComponent } from './components/selectTeam.component';
import { SelectSprintComponent } from './components/selectSprint.component';
import { isNumber } from '../../../../common/utils';

interface Props {
  teams: Team[];
  projects: Project[];
  sprints: Sprint[];
  isLoading: Loading;
  onChangeProject: (projects: Project[]) => void;
  onChangeTeam: (team: Team[]) => void;
  onChangeSprint: (sprints: Sprint[], teamName: string) => void;
  onChangeWorkItems: (workItems: WorkItem[]) => void;
  reactToPrintTrigger: () => React.ReactElement;
  reactToPrintContent: () => React.ReactInstance;
  changeIsLoading: (key: LoadingKeys, value: boolean) => void;
}

export const SelectOptionsComponent: React.FunctionComponent<Props> = (props) => {
  const [selectedProject, setSelectedProject] = React.useState<string | number>('');
  const [selectedTeam, setSelectedTeam] = React.useState<string | number>('');
  const [selectedSprint, setSelectedSprint] = React.useState<string | number>('');

  React.useEffect(() => {
    setSelectedTeam('');
    setSelectedSprint('');
    props.onChangeSprint(null, '');
    props.onChangeWorkItems(null);
  }, [selectedProject]);

  React.useEffect(() => {
    setSelectedSprint('');
    props.onChangeWorkItems(null)
  }, [selectedTeam]);

  const onChangeIsLoading = React.useCallback((key: LoadingKeys) => (value: boolean) => props.changeIsLoading(key, value), [props.isLoading]);
  const projectName = isNumber(selectedProject) ? props.projects[selectedProject].name : '';
  const teamId = isNumber(selectedTeam) ? props.teams[selectedTeam].id : '';

  return (
    <SelectContainer>
      <SelectProjectComponent
        setSelectedProject={setSelectedProject}
        selectedProject={selectedProject}
        projects={props.projects}
        onChangeProject={props.onChangeProject}
        onChangeTeam={props.onChangeTeam}
        isLoading={props.isLoading.projects}
        changeIsLoading={onChangeIsLoading('projects')}
      />
      <SelectTeamComponent
        teams={props.teams}
        onChangeSprint={props.onChangeSprint}
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
        projectName={projectName}
        isLoading={props.isLoading.teams}
        changeIsLoading={onChangeIsLoading('teams')}
      />
      <SelectSprintComponent
        onChangeWorkItems={props.onChangeWorkItems}
        selectedSprint={selectedSprint}
        setSelectedSprint={setSelectedSprint}
        sprints={props.sprints}
        projectName={projectName}
        teamId={teamId}
        isLoading={props.isLoading.teams}
        changeIsLoading={onChangeIsLoading('sprints')}
      />
      <ReactToPrint
        trigger={props.reactToPrintTrigger}
        content={props.reactToPrintContent}
      />
    </SelectContainer>
  )
}
