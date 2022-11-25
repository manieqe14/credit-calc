import { InputAdornment, TextField } from '@mui/material';
import React from 'react';
import { TextInputProps } from './textInput.types';

export const TextInput: React.FC<TextInputProps> = (props) => {

  const suffix = (props.suffix != null) ? {
    InputProps: {
      endAdornment: (
        <InputAdornment position="end">{props.suffix}</InputAdornment>
      )
    }
  } : null;

  return (
    <TextField
      {...suffix}
      inputProps={{
        style: {
          padding: '7px 12px',
        },
      }}
      sx={{ margin: '5px' }}
      {...props}
      variant="outlined"
    >
      {props.children}
    </TextField>
  );
};
