import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { ModeToggleProps } from './ModeToggle.types';

const ModeToggle: React.FC<ModeToggleProps> = ({ mode, toggle }) => {
  return (
    <IconButton sx={{ mr: 3 }} onClick={() => toggle()} color="inherit">
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default observer(ModeToggle);
