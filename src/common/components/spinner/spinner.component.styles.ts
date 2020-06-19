import { styled } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

export const Spinner = styled(CircularProgress)({
  position: 'absolute',
});

export const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'inherit',
})
