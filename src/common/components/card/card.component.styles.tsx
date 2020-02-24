import { styled, Card, Typography, CardContent } from "@material-ui/core";
import { WorkItemType } from "../../../model";

export const CardContainer = styled(Card)({
  width: '45%',
  marginBottom: '10px',
  padding: 0,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '165px',
  maxWidth: '500px',
})

export const CardBody = styled(CardContent)({
  flexGrow: 1,
})

export const getTitleComponent = (workItemType: WorkItemType) => styled(Typography)({
  width: '100%',
  textAlign: 'center',
  padding: '10px 0',
  backgroundColor: workItemType === 'BUG' ? '#ee5253' : '#74b9ff',
})

export const Description = styled(Typography)({
  width: '100%',
  textAlign: 'center',
})

export const Effort = styled(Typography)({
  width: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRight: '1px solid rgba(0, 0, 0, 0.12)',
})

export const TeamName = styled(Typography)({
  width: '50%',
  textAlign: 'center',
})

export const FooterContainer = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
})
