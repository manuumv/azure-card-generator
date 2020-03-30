import * as React from 'react';
import { CircularProgressProps } from '@material-ui/core';
import { Container, Spinner } from './spinner.component.styles';

interface Props extends CircularProgressProps {
  isLoading: boolean;
  fullWidth?: boolean;
  fullHeight?: boolean;
};

export const SpinnerComponent: React.FunctionComponent<Props> = ({ children, isLoading, fullWidth, fullHeight, ...spinnerProps }) => {
  const width = fullWidth ? '100%' : 'inherit';
  const height = fullHeight ? '100%' : 'inherit';
  return (
    isLoading ?
      <Container style={{ height, width}} >
        <Spinner {...spinnerProps} />
        {children}
      </Container>
      :
      <>
        {children}
      </>
  );
}

SpinnerComponent.defaultProps = {
  fullWidth: false,
  fullHeight: false,
}
