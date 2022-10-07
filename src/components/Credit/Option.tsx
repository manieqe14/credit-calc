import { BiPlus, BiMinus } from 'react-icons/bi';
import { rounder } from '../../Utils/Helpers';
import React, { ReactElement } from 'react';
import { UserInput } from './Credit';

export interface OptionConfig {
  userInput: UserInput;
  step: number;
  onChange: (value: UserInput) => void;
}

export const Option = ({
  userInput,
  step,
  onChange,
}: OptionConfig): ReactElement => {
  const handleOnChange = (value: number): void => {
    onChange({ ...userInput, value: rounder(value) });
  };

  return (
    <div className="flex-container w-equal-3">
      <label>{userInput.name}</label>
      <div>
        <span>
          <BiMinus onClick={() => handleOnChange(userInput.value - step)} />
        </span>
        <input
          type="number"
          min="0"
          step={step}
          value={userInput.value}
          onChange={(event) => handleOnChange(parseFloat(event.target.value))}
        />
        <span>
          <BiPlus
            onClick={() => handleOnChange(rounder(userInput.value + step))}
          />
        </span>
      </div>
      <span>{userInput.unit}</span>
    </div>
  );
};
