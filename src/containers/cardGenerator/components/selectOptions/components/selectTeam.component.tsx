import * as React from 'react';
import { SelectComponent } from '../../../../../common/components/select';
import { SpinnerComponent } from '../../../../../common/components/spinner';
import { mapToSelectOptions } from '../../../../../common/mappers';
import { getSprints } from '../../../../../common/services/api';
import { UserSessionService } from '../../../../../common/services/storage';
import { isNumber } from '../../../../../common/utils';
import { mapSprintsApiModelToVM } from '../../../mappers';
import { Sprint, Team } from '../../../viewmodel';
import { SnackbarContext } from '../../../../../common/providers';

interface Props {
  teams: Team[];
  isLoading: boolean;
  selectedTeam: string | number;
  projectName: string;
  setSelectedTeam: (value: string | number) => void;
  onChangeSprint: (sprints: Sprint[], teamName: string) => void,
  changeIsLoading: (value: boolean) => void;
}

export const SelectTeamComponent: React.FunctionComponent<Props> = (props) => {
  const { useSnackbar } = React.useContext(SnackbarContext);

  const onChangeTeam = async (value: string | number) => {
    props.setSelectedTeam(value);
    if (isNumber(value)) {
      try {
        props.changeIsLoading(true);
        const organization = UserSessionService.get()?.organization;
        const sprints = await getSprints(organization, props.projectName, props.teams[value].id);
        props.onChangeSprint(mapSprintsApiModelToVM(sprints), props.projectName);
        props.changeIsLoading(false);
      } catch (error) {
        props.changeIsLoading(false);
        useSnackbar(error, 'error');
      }
    }
  }

  return (
    <SpinnerComponent displayChildren={true} isLoading={props.isLoading}>
      <SelectComponent
        id="teams"
        label="Teams:"
        values={mapToSelectOptions<Team>(props.teams, 'name')}
        selectedValue={props.selectedTeam}
        onChangeOption={onChangeTeam}
        disabled={props.isLoading}
      />
    </SpinnerComponent>
  )
}
