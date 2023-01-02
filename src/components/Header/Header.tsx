import React from 'react';
import { Box, Toolbar, Typography, AppBar } from '@mui/material';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import Persistance from '../Persistance/Persistance';
import ModeToggler from '../ModeToggler/ModeToggle';
import { ModeToggleProps } from '../ModeToggler/ModeToggle.types';

export const Header: React.FC<ModeToggleProps> = (props) => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Credit Calculator
        </Typography>
        <ModeToggler {...props} />
        <Persistance />
        <LanguageSelector />
      </Toolbar>
    </AppBar>
  </Box>
);
