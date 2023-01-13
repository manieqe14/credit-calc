import React, { PropsWithChildren } from 'react';
import { Box, Paper, SxProps, Theme } from '@mui/material';

export const Wrapper: React.FC<PropsWithChildren<WrapperProps>> = ({
  sx,
  children,
  fullwidth,
  ...props
}) => {
  return (
    <Box sx={OuterWrapper(fullwidth)}>
      <Paper
        elevation={1}
        {...props}
        sx={{
          margin: '10px',
          padding: '1.75rem',
          position: 'relative',
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
  fullwidth?: boolean;
}

const OuterWrapper = (fullwidth: boolean | undefined): SxProps => ({
  width:
    fullwidth === true
      ? '100%'
      : {
          xs: 'calc(100%)',
          sm: 'calc(100%/2)',
          md: 'calc(100%/3)',
          lg: 'calc(100%/4)',
        },
});
