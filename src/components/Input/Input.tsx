import { Add, Remove } from '@mui/icons-material';
import { rounder } from '../../Utils/Helpers';
import React, { ReactElement } from 'react';
import { UserInput } from '../types';

import { TextInput } from '../../view/inputs/textInput';

export interface OptionConfig {
  userInput: UserInput;
  onChange: (value: number) => void;
}

export const Input = ({ userInput, onChange }: OptionConfig): ReactElement => {
  return (
    <div>
      <Remove
        onClick={() => onChange(rounder(userInput.value - userInput.step))}
      />
      <TextInput
        label={userInput.name}
        type="number"
        value={userInput.value}
        suffix={userInput.unit}
        onChange={(event) => onChange(parseFloat(event.target.value))}
      />
      <Add
        onClick={() => onChange(rounder(userInput.value + userInput.step))}
      />
    </div>
  );
};
