import { Add, Remove } from '@mui/icons-material';
import { rounder } from '../../Utils/helpers';
import React, { ReactElement } from 'react';
import { UserInputInterface } from '../types';
import TextInput from '../../view/inputs/textInput';
import { InputIconStyle, InputRow } from './Input.styles';
import { useTranslation } from 'react-i18next';

export interface OptionConfig {
  userInput: UserInputInterface;
  onChange: (value: number) => void;
}

export const Input = ({ userInput, onChange }: OptionConfig): ReactElement => {
  const { name, value, unit, step } = userInput;
  const { t } = useTranslation();

  return (
    <InputRow>
      <Remove
        aria-roledescription="decrement value"
        sx={InputIconStyle}
        onClick={() => onChange(rounder(value - step))}
      />
      <TextInput
        label={t(name)}
        type="number"
        value={value}
        suffix={unit}
        onChange={(event) => onChange(parseFloat(event.target.value))}
      />
      <Add
        sx={InputIconStyle}
        aria-roledescription="increment value"
        onClick={() => onChange(rounder(value + step))}
      />
    </InputRow>
  );
};
