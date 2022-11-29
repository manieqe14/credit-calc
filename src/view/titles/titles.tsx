import React, { PropsWithChildren } from 'react';
import { Typography } from '@mui/material';

export const Subtitle: React.FC<PropsWithChildren<{}>> = ({ children }) => (
  <Typography variant="h5" sx={{ textAlign: 'center' }}>
    {children}
  </Typography>
);

export const Title: React.FC<PropsWithChildren<{}>> = ({ children }) => (
  <Typography variant="h1">{children}</Typography>
);
