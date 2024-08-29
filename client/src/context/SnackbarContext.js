import React, { createContext, useContext, useState } from 'react';
import { Snackbar } from '@mui/material';

const SnackbarContext = createContext();

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};

export const SnackbarProvider = ({ children }) => {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
    vertical: 'top',
    horizontal: 'center',
  });

  const openSnackbar = (message, vertical = 'top', horizontal = 'center') => {
    setSnackbarState({ open: true, message, vertical, horizontal });
    setTimeout(() => {
      setSnackbarState((prevState) => ({ ...prevState, open: false }));
    }, 3000);
  };

  const closeSnackbar = () => {
    setSnackbarState((prevState) => ({ ...prevState, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar }}>
      {children}
      <Snackbar
        anchorOrigin={{
          vertical: snackbarState.vertical,
          horizontal: snackbarState.horizontal,
        }}
        open={snackbarState.open}
        onClose={closeSnackbar}
        message={snackbarState.message}
        key={snackbarState.vertical + snackbarState.horizontal}
      />
    </SnackbarContext.Provider>
  );
};
