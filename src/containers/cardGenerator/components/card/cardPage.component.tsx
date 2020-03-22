import * as React from 'react';
import { WorkItem } from '../../viewmodel';
import { CardPage } from './cardPage.component.styles';
import { CardComponent } from './card.component';

interface Props {
  workItems: WorkItem[][];
  teamName: string;
}

export const CardPageComponent: React.FunctionComponent<Props> = ({ workItems, teamName }) => {
  return (
    <>
      {
        Array.isArray(workItems) &&
        workItems.map((childWorkItems, index) => (
          <CardPage key={index}>
            {
              childWorkItems.map((childWorkItem) => (
                <CardComponent key={childWorkItem.id} teamName={teamName} workItem={childWorkItem} />
              ))
            }
          </CardPage >
        ))
      }
    </>
  )
}
