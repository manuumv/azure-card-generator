import * as React from 'react';
import { SelectComponent, SpinnerComponent } from 'common/components';
import { mapToSelectOptions } from 'common/mappers';
import { getSprints } from 'api/rest';
import { UserSessionService } from 'common/services';
import { isNumber } from 'common/utils';
import { mapSprintsApiModelToVM } from '../../../../mappers';
import { Sprint, Team } from '../../../../viewmodel';
import { SnackbarContext } from 'common/providers';

interface Props {
  teams: Team[];
  selectedTeam: string | number;
  projectName: string;
  setSelectedTeam: (value: string | number) => void;
  onChangeSprint: (sprints: Sprint[], teamName: string) => void;
}

export const SelectTeamComponent: React.FunctionComponent<Props> = (props) => {
  const { useSnackbar } = React.useContext(SnackbarContext);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onChangeTeam = async (value: string | number) => {
    props.setSelectedTeam(value);
    if (isNumber(value)) {
      try {
        setIsLoading(true);
        const organization = UserSessionService.get()?.organization;
        const sprints = await getSprints(organization, props.projectName, props.teams[value].id);
        props.onChangeSprint(mapSprintsApiModelToVM(sprints), props.teams[value].name);
      } catch (error) {
        useSnackbar(error.message, 'error');
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <SpinnerComponent isLoading={isLoading}>
      <SelectComponent
        id="teams"
        label="Teams:"
        values={mapToSelectOptions<Team>(props.teams, 'name')}
        selectedValue={props.selectedTeam}
        onChangeOption={onChangeTeam}
        disabled={isLoading}
      />
    </SpinnerComponent>
  )
}
