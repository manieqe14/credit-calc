import { Add, Remove } from '@mui/icons-material';
import { rounder } from '../../Utils/Helpers';
import React, { ReactElement } from 'react';
import { UserInput } from '../types';
import TextInput from '../../view/inputs/textInput';
import { InputRow } from './Input.styles';
import { useTranslation } from "react-i18next";

export interface OptionConfig {
  userInput: UserInput;
  onChange: (value: number) => void;
}

export const Input = ({ userInput, onChange }: OptionConfig): ReactElement => {
  const { name, value, unit, step } = userInput;
  const { t } = useTranslation();
  return(
    <InputRow>
      <Remove
        onClick={() => onChange(rounder(value - step))}
      />
      <TextInput
        label={t(name)}
        type="number"
        value={value}
        suffix={unit}
        onChange={(event) => onChange(parseFloat(event.target.value))}
      />
      <Add onClick={() => onChange(rounder(value + step))} />
    </InputRow>
  );
}
