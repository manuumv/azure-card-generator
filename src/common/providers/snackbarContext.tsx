import * as React from "react";
import { Snackbar } from '@material-ui/core';
import { Alert, Color } from '@material-ui/lab';

interface SnackbarContext {
  useSnackbar: (message: string, severity: Color) => void;
}

const defaultSnackbarContext: SnackbarContext = {
  useSnackbar: () => { },
};

export const SnackbarContext = React.createContext<SnackbarContext>(defaultSnackbarContext);

export const SnackbarProvider: React.FunctionComponent = ({ children }) => {
  const [message, setMessage] = React.useState<string>('');
  const [severity, setSeverity] = React.useState<Color>('info');
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const useSnackbar = React.useCallback((message: string, severity: Color) => {
    setMessage(message);
    setSeverity(severity);
    setIsOpen(true);
  }, []);

  const handleClose = React.useCallback(() => setIsOpen(false), []);

  return (
    <SnackbarContext.Provider value={{ useSnackbar }}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        key="top,right"
        open={isOpen}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert variant="filled" elevation={6} onClose={handleClose} severity={severity} >
          {message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
};
