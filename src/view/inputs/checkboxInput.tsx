import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';
import { inputWrapper } from '../wrapper/inputWrapper';
import { CheckboxInputProps } from './inputs.types';

const CheckboxInput: React.FC<CheckboxInputProps> = (props) => {
  return (
    <FormControlLabel
      value={props.checked}
      control={<Checkbox {...props} />}
      label={props.label}
      labelPlacement="start"
    />
  );
};

export default inputWrapper(CheckboxInput);
