import * as React from 'react';
import { WorkItem } from '../../../viewmodel';
import { CardContainer, Description, Effort, TeamName, FooterContainer, CardBody, Title, HeaderContainer, Type } from './card.component.styles';
import { Divider } from '@material-ui/core';
import { getCardBackgroundColor } from './card.component.business';

interface Props {
  teamName: string;
  workItem: WorkItem;
}

export const CardComponent: React.FunctionComponent<Props> = ({ teamName, workItem }) => {

  const backgroundColor = getCardBackgroundColor(workItem.type);

  return (
    <CardContainer>
      <HeaderContainer>
        <Type style={{ backgroundColor }}>{workItem.type}</Type>
        <Title>{workItem.id}</Title>
      </HeaderContainer>
      <Divider />
      <CardBody>
        <Description>{workItem.title}</Description>
      </CardBody>
      <Divider />
      <FooterContainer>
        <TeamName>{teamName}</TeamName>
        <Effort>Effort: {workItem.effort} </Effort>
      </FooterContainer>
    </CardContainer>
  )
}

