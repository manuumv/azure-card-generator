import * as ApiModel from 'api/model';
import * as ViewModel from '../../viewmodel';

export const mapSprintsApiModelToVM = (sprints: ApiModel.SprintCollection): ViewModel.Sprint[] => (
  sprints && Array.isArray(sprints.value) ?
    sprints.value.map(mapSprintApiModelToVM) :
    []
)

export const mapSprintApiModelToVM = (sprint: ApiModel.Sprint): ViewModel.Sprint => (
  sprint ?
    {
      id: sprint.id,
      name: sprint.name,
      path: sprint.path,
      url: sprint.url,
      startDate: sprint.attributes?.startDate,
      finishDate: sprint.attributes?.finishDate,
      timeFrame: sprint.attributes?.timeFrame,
    } :
    null
)
