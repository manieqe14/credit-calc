import React from 'react';
import { Typography, TypographyProps } from '@mui/material';

export const MutedText = (props: TypographyProps) => {
  const { sx, children, ...newProps } = props;

  return (
    <Typography sx={{ ...sx, opacity: '0.5' }} {...newProps}>
      {children}
    </Typography>
  );
};
