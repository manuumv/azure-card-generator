import * as React from 'react';
import { WorkItem } from '../../viewmodel';
import { CardContainer, getTypeComponent, Description, Effort, TeamName, FooterContainer, CardBody, Title, HeaderContainer } from './card.component.styles';
import { Divider } from '@material-ui/core';

interface Props {
  teamName: string;
  workItem: WorkItem;
}

export const CardComponent: React.FunctionComponent<Props> = ({ teamName, workItem }) => {

  const Type = getTypeComponent(workItem.type);

  return (
    <CardContainer>
      <HeaderContainer>
        <Type>{workItem.type}</Type>
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

