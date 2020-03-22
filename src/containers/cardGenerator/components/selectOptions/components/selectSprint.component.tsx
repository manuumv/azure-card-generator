import * as React from 'react';
import { SelectComponent } from '../../../../../common/components/select';
import { SpinnerComponent } from '../../../../../common/components/spinner';
import { mapToSelectOptions } from '../../../../../common/mappers';
import { getWorkItemRelations, getWorkItems } from '../../../../../common/services/api';
import { UserSessionService } from '../../../../../common/services/storage';
import { isNumber } from '../../../../../common/utils';
import { mapWorkItemRelationsApiModelToVM, mapWorkItemsApiModelToVM } from '../../../mappers';
import { Sprint, WorkItem } from '../../../viewmodel';
import { SnackbarContext } from '../../../../../common/providers';

interface Props {
  sprints: Sprint[];
  isLoading: boolean;
  selectedSprint: string | number;
  projectName: string;
  teamId: string;
  setSelectedSprint: (value: string | number) => void;
  onChangeWorkItems: (workItems: WorkItem[]) => void,
  changeIsLoading: (value: boolean) => void;
}

export const SelectSprintComponent: React.FunctionComponent<Props> = (props) => {
  const { useSnackbar } = React.useContext(SnackbarContext);

  const onChangeSprint = async (value: string | number) => {
    props.setSelectedSprint(value);
    if (isNumber(value)) {
      try {
        props.changeIsLoading(true);
        const organization = UserSessionService.get()?.organization;
        const workItemRelations = await getWorkItemRelations(organization, props.projectName, props.teamId, props.sprints[value].id);
        const workItemIds = mapWorkItemRelationsApiModelToVM(workItemRelations);
        const workItems = await getWorkItems(organization, props.projectName, workItemIds);
        props.onChangeWorkItems(mapWorkItemsApiModelToVM(workItems));
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
        id="sprints"
        label="Sprints:"
        values={mapToSelectOptions<Sprint>(props.sprints, 'name')}
        selectedValue={props.selectedSprint}
        onChangeOption={onChangeSprint}
        disabled={props.isLoading}
      />
    </SpinnerComponent>
  )
}
