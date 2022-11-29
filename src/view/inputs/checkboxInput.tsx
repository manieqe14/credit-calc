import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';
import { inputWrapper } from '../wrapper/inputWrapper';
import { CheckboxInputProps } from './inputs.types';

const CheckboxInput: React.FC<CheckboxInputProps> = (props) => (
  <FormControlLabel
    value={props.checked}
    control={
      <Checkbox {...props} sx={{ position: 'absolute', left: '-20px' }} />
    }
    labelPlacement="start"
    label
  />
);

export default inputWrapper(CheckboxInput);
