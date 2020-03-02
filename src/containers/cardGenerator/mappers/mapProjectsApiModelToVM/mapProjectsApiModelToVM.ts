import * as ApiModel from "../../../../model/api";
import * as ViewModel from "../../../../model/view";

export const mapProjectsApiModelToVM = (projects: ApiModel.ProjectCollection): ViewModel.Project[] => (
  projects && Array.isArray(projects.value) ?
    projects.value.map(mapProjectApiModelToVM) :
    []
)

export const mapProjectApiModelToVM = (project: ApiModel.Project): ViewModel.Project => (
  project ?
    {
      id: project.id,
      name: project.name,
      state: project.state
    } :
    null
)
