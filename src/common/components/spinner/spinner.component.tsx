import * as React from 'react';
import { CircularProgressProps } from '@material-ui/core';
import { Container, Spinner } from './spinner.component.styles';

interface Props extends CircularProgressProps {
  isLoading: boolean;
  displayChildren?: boolean;
};

export const SpinnerComponent: React.FunctionComponent<Props> = ({ children, isLoading, displayChildren, ...spinnerProps }) => {
  if (displayChildren && isLoading) {
    return (
      <Container >
        <Spinner {...spinnerProps} />
        {children}
      </Container>
    )
  };

  return (
    isLoading ?
      <Spinner  {...spinnerProps} />
      :
      <>
        {children}
      </>
  )
};
