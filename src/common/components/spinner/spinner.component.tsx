import * as React from 'react';
import { CircularProgressProps } from '@material-ui/core';
import { Container, Spinner } from './spinner.component.styles';

interface Props extends CircularProgressProps {
  isLoading: boolean;
};

export const SpinnerComponent: React.FunctionComponent<Props> = ({ children, isLoading, ...spinnerProps }) => (
  isLoading ?
    <Container >
      <Spinner {...spinnerProps} />
      {children}
    </Container>
    :
    <>
      {children}
    </>
);
