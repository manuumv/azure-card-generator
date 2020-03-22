import { styled, Card, Typography, CardContent } from "@material-ui/core";
import { WorkItemType } from "../../viewmodel";
import { WorkItemTypeColors, cardColors } from "../../../../styles";

export const CardContainer = styled(Card)({
  width: '45%',
  height: '18vh',
  marginBottom: '4px',
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
});

export const CardBody = styled(CardContent)({
  flexGrow: 1,
  padding: '0.1vh',
  height: '5vh',
  overflow: 'hidden',
  wordBreak: 'break-word',
});

export const Title = styled(Typography)({
  width: '30%',
  textAlign: 'center',
  backgroundColor: cardColors.titleBackground,
  color: cardColors.titleColor,
  padding: '0.2vh 0',
});

export const getTypeComponent = (workItemType: WorkItemType) => styled(Typography)({
  width: '70%',
  textAlign: 'center',
  padding: '0.2vh 0',
  backgroundColor: workItemType === 'BUG' ? WorkItemTypeColors.bug : WorkItemTypeColors.pbi,
});

export const Description = styled(Typography)({
  width: '100%',
  textAlign: 'center',
});

export const Effort = styled(Typography)({
  width: '30%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderLeft: `1px solid ${cardColors.effortBorder}`,
});

export const TeamName = styled(Typography)({
  width: '70%',
  textAlign: 'center',
});

export const HeaderContainer = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
})

export const FooterContainer = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
});
