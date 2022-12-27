import React from 'react';
import { Box, Toolbar, Typography, AppBar } from '@mui/material';
import LanguageSelector from '../LanguageSelector/LanguageSelector';

export const Header: React.FC<{}> = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Credit Calculator
        </Typography>
        <LanguageSelector />
      </Toolbar>
    </AppBar>
  </Box>
);
