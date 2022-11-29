import { FormControl, InputLabel, Select } from '@mui/material';
import React from 'react';
import { SelectInputProps } from './inputs.types';
import { inputWrapper } from '../wrapper/inputWrapper';

const SelectInput: React.FC<SelectInputProps> = (props) => (
  <FormControl>
    <InputLabel id={props.label}>{props.label}</InputLabel>
    <Select {...props}>{props.children}</Select>
  </FormControl>
);

export default inputWrapper(SelectInput);
