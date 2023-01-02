import { PaletteMode } from '@mui/material';

export interface ModeToggleProps {
  mode: PaletteMode;
  toggle: () => void;
}