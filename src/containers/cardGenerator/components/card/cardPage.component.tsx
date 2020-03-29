import * as React from 'react';
import { WorkItem } from '../../viewmodel';
import { CardPage } from './cardPage.component.styles';
import { CardComponent } from './card.component';
import { filterWorkItems } from './cardPage.component.business';

interface Props {
  workItems: WorkItem[];
  teamName: string;
  filters: string[];
}

export const CardPageComponent: React.FunctionComponent<Props> = ({ workItems, filters, teamName }) => {
  const filteredWorkItems: WorkItem[][] = filterWorkItems(workItems, filters);
  return (
    <>
      {
        Array.isArray(filteredWorkItems) &&
        filterWorkItems(workItems, filters).map(renderCardPage(teamName))
      }
    </>
  )
}

const renderCardPage = (teamName: string) => (workItems: WorkItem[], index: number) => (
  Array.isArray(workItems) &&
  <CardPage key={index}>
    {
      workItems.map((workItem) => (
        <CardComponent key={workItem.id} teamName={teamName} workItem={workItem} />
      ))
    }
  </CardPage >
)
