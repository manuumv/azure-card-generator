import * as React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { WorkItem } from '../../../model';

interface Props {
  teamName: string;
  workItem: WorkItem;
}

export const CardComponent: React.FunctionComponent<Props> = ({ teamName, workItem }) => (
  <Card variant="outlined">
    <CardContent>
      <Typography color="textSecondary" gutterBottom> {teamName} </Typography>
      <Typography color="textSecondary" gutterBottom> {workItem.fields["System.Title"]} </Typography>
      <Typography variant="body2" component="p"> {workItem.fields["System.System.Effort"]} </Typography>
    </CardContent>
  </Card>
)
