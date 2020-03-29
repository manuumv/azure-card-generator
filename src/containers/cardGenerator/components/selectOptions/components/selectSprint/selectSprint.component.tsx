import * as React from 'react';
import { SelectComponent, SpinnerComponent } from 'common/components';
import { mapToSelectOptions } from 'common/mappers';
import { getWorkItemRelations, getWorkItems } from 'api/rest';
import { UserSessionService } from 'common/services';
import { isNumber } from 'common/utils';
import { mapWorkItemRelationsApiModelToVM, mapWorkItemsApiModelToVM } from '../../../../mappers';
import { Sprint, WorkItem } from '../../../../viewmodel';
import { SnackbarContext } from 'common/providers';
import { handleEmptyWorkItemIds } from './selectSprint.component.business';

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
        await handleEmptyWorkItemIds(workItemIds)
        const workItems = await getWorkItems(organization, props.projectName, workItemIds);
        props.onChangeWorkItems(mapWorkItemsApiModelToVM(workItems));
      } catch (error) {
        props.onChangeWorkItems([]);
        useSnackbar(error.message, 'error');
      } finally {
        props.changeIsLoading(false);
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
