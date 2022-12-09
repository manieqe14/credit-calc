import { InputAdornment, TextField } from '@mui/material';
import React from 'react';
import { inputWrapper } from '../wrapper/inputWrapper';
import { TextInputProps } from './inputs.types';
import { isNil } from 'ramda';

const TextInput: React.FC<TextInputProps> = (props) => {
  return (
    <TextField
      style={{ margin: '0.75rem 0' }}
      fullWidth
      inputProps={{
        style: {
          padding: '7px 12px',
          ...(!isNil(props.suffix) && {
            endAdornment: (
              <InputAdornment position="end">{props.suffix}</InputAdornment>
            ),
          }),
        },
      }}
      {...props}
      variant="outlined"
    >
      {props.children}
    </TextField>
  );
};

export default inputWrapper(TextInput);
