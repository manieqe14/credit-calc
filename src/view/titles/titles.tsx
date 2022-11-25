import React, { PropsWithChildren } from 'react';
import { Typography } from '@mui/material';

export const Subtitle: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return <Typography variant="h5">{children}</Typography>;
};
