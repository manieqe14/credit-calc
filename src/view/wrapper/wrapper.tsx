import React, { PropsWithChildren } from 'react';
import { Paper, SxProps, Theme } from '@mui/material';

export const Wrapper: React.FC<PropsWithChildren<WrapperProps>> = ({
  sx,
  children,
  ...props
}) => {
  return (
    <Paper
      elevation={1}
      {...props}
      sx={{
        margin: '10px',
        padding: '1.75rem',
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
};

interface WrapperProps {
  sx?: SxProps<Theme>;
}
