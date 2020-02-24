import * as React from 'react';
import { WorkItem, WorkItemType } from '../../../model';
import { CardContainer, getTitleComponent, Description, Effort, TeamName, FooterContainer, CardBody } from './card.component.styles';
import { Divider } from '@material-ui/core';

interface Props {
  teamName: string;
  workItem: WorkItem;
}

export const CardComponent: React.FunctionComponent<Props> = ({ teamName, workItem }) => {

  const Title = getTitleComponent(workItem.fields["System.WorkItemType"].toUpperCase() as WorkItemType);

  return (
    <CardContainer>
      <Title>{workItem.id}</Title>
      <Divider />
      <CardBody>
        <Description>{workItem.fields["System.Title"]}</Description>
      </CardBody>
      <Divider />
      <FooterContainer>
        <Effort>Effort: {workItem.fields["Microsoft.VSTS.Scheduling.Effort"]} </Effort>
        <TeamName>{teamName}</TeamName>
      </FooterContainer>
    </CardContainer>
  )
}

