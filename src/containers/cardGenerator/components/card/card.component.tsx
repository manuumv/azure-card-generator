import * as React from 'react';
import { WorkItem, WorkItemType } from '../../../../model/view';
import { CardContainer, getTitleComponent, Description, Effort, TeamName, FooterContainer, CardBody } from './card.component.styles';
import { Divider } from '@material-ui/core';

interface Props {
  teamName: string;
  workItem: WorkItem;
}

export const CardComponent: React.FunctionComponent<Props> = ({ teamName, workItem }) => {

  const Title = getTitleComponent(workItem.type);

  return (
    <CardContainer>
      <Title>{workItem.id}</Title>
      <Divider />
      <CardBody>
        <Description>{workItem.title}</Description>
      </CardBody>
      <Divider />
      <FooterContainer>
        <Effort>Effort: {workItem.effort} </Effort>
        <TeamName>{teamName}</TeamName>
      </FooterContainer>
    </CardContainer>
  )
}

