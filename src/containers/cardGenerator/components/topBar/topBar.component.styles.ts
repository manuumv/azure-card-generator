import { styled, Typography, AppBar } from '@material-ui/core';
import { resolutions, appBarColors } from 'styles';

export const HeaderBar = styled(AppBar)({
  backgroundColor: appBarColors.background,
});

export const Title = styled(Typography)({
  textAlign: 'center',
  marginRight: 'auto',
  fontWeight: 'bold',
  fontSize: '1rem',
  [`@media (min-width: ${resolutions.iphone4Landscape})`]: {
    fontSize: '1.5rem',
  }
});

export const UserEmail = styled(Typography)({
  marginRight: '10px',
  fontSize: '0.6rem',
  [`@media (min-width: ${resolutions.iphone4Landscape})`]: {
    fontSize: '1rem',
  }
});
