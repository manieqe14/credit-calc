import React, { PropsWithChildren } from 'react';
import { Paper } from '@mui/material';

export const Wrapper: React.FC<PropsWithChildren<{}>> = ({ children }) => (
  <Paper
    elevation={1}
    sx={{
      margin: '10px',
      padding: '1.75rem',
    }}
  >
    {children}
  </Paper>
);
