import { InputLabel, Select } from '@mui/material';
import React from 'react';
import { inputWrapper } from '../wrapper/inputWrapper';
import { SelectInputProps } from './inputs.types';

const SelectInput: React.FC<SelectInputProps> = (props) => {
  console.info('Value: ', props.value);
  return (
    <>
      <InputLabel id={props.label}>{props.label}</InputLabel>
      <Select {...props}>{props.children}</Select>
    </>
  );
};

export default inputWrapper(SelectInput);
