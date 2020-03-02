import { styled, Card, Typography, CardContent } from "@material-ui/core";
import { WorkItemType } from "../../../../model/view";

export const CardContainer = styled(Card)({
  width: '40vw',
  height: '18vh',
  marginBottom: '3px',
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
})

export const CardBody = styled(CardContent)({
  flexGrow: 1,
  padding: '0.1vh',
  height: '5vh',
  overflow: 'hidden',
  wordBreak: 'break-word',
})

export const getTitleComponent = (workItemType: WorkItemType) => styled(Typography)({
  width: '100%',
  textAlign: 'center',
  padding: '0.2vh 0',
  backgroundColor: workItemType === WorkItemType.BUG ? '#ee5253' : '#74b9ff',
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
