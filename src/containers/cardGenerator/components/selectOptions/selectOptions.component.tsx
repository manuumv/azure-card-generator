import * as React from 'react';
import ReactToPrint from 'react-to-print';
import { Project, Sprint, Team, WorkItem } from '../../viewmodel';
import { SelectContainer, } from './selectOptions.component.styles';
import { SelectProjectComponent, SelectTeamComponent, SelectSprintComponent } from './components';
import { isNumber } from 'common/utils';
import { pathOr } from 'ramda';
import { Button } from '@material-ui/core';

interface Props {
  teams: Team[];
  projects: Project[];
  sprints: Sprint[];
  isDisabledPrintButton: boolean;
  onChangeProject: (projects: Project[]) => void;
  onChangeTeam: (team: Team[]) => void;
  onChangeSprint: (sprints: Sprint[], teamName: string) => void;
  onChangeWorkItems: (workItems: WorkItem[]) => void;
  componentToPrintRef: React.MutableRefObject<undefined>;
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
    props.onChangeWorkItems(null);
  }, [selectedTeam]);

  const projectName = isNumber(selectedProject) ? props.projects[selectedProject].name : '';
  const teamId = pathOr('', [selectedTeam, 'id'], props.teams);
  const reactToPrintContent = () => props.componentToPrintRef.current;

  return (
    <SelectContainer>
      <SelectProjectComponent
        setSelectedProject={setSelectedProject}
        selectedProject={selectedProject}
        projects={props.projects}
        onChangeProject={props.onChangeProject}
        onChangeTeam={props.onChangeTeam}
      />
      <SelectTeamComponent
        teams={props.teams}
        onChangeSprint={props.onChangeSprint}
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
        projectName={projectName}
      />
      <SelectSprintComponent
        onChangeWorkItems={props.onChangeWorkItems}
        selectedSprint={selectedSprint}
        setSelectedSprint={setSelectedSprint}
        sprints={props.sprints}
        projectName={projectName}
        teamId={teamId}
      />
      <ReactToPrint
        trigger={reactToPrintTrigger(props.isDisabledPrintButton)}
        content={reactToPrintContent}
      />
    </SelectContainer>
  )
}

const reactToPrintTrigger = (disabled: boolean) => () => (
  <Button disabled={disabled}>Print</Button>
);
