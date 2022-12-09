import { Checkbox } from '@mui/material';
import React from 'react';
import { inputWrapper } from '../wrapper/inputWrapper';
import { CheckboxInputProps } from './inputs.types';

const CheckboxInput: React.FC<CheckboxInputProps> = (props) => (
  <Checkbox
    {...props}
    sx={{
      position: 'absolute',
      left: '-35px',
      top: '50%',
      transform: 'translateY(-50%)',
    }}
  />
);

export default inputWrapper(CheckboxInput);
