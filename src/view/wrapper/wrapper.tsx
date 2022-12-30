import React, { PropsWithChildren } from 'react';
import { Box, Paper, SxProps, Theme } from '@mui/material';

export const Wrapper: React.FC<PropsWithChildren<WrapperProps>> = ({
  sx,
  children,
  ...props
}) => {
  return (
    <Box sx={OuterWrapper}>
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
    </Box>
  );
};

interface WrapperProps {
  sx?: SxProps<Theme>;
}

const OuterWrapper: SxProps = {
  width: {
    xs: 'calc(100%)',
    sm: 'calc(100%/2)',
    md: 'calc(100%/3)',
    lg: 'calc(100%/4)',
  },
};
