import { FormControl, InputLabel, Select } from '@mui/material';
import React from 'react';
import { SelectInputProps } from './inputs.types';
import { inputWrapper } from '../wrapper/inputWrapper';

const SelectInput: React.FC<SelectInputProps> = (props) => (
  <FormControl sx={{ minWidth: 100, position: 'relative' }}>
    <InputLabel id={props.label}>{props.label}</InputLabel>
    <Select
      style={{ margin: "0 10px 0 0" }}
      {...props}
      inputProps={{
        style: {
          padding: '15px',
        },
      }}
    >
      {props.children}
    </Select>
  </FormControl>);

export default inputWrapper(SelectInput);
