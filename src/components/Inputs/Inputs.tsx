import { Input } from '../Input/Input';
import React from 'react';
import { InputsFormInterface } from './Inputs.types';
import { useInputDataContext } from '../../context/InputDataContext';
import { Subtitle } from '../../view/titles/titles';

const Inputs: React.FC<InputsFormInterface> = ({ setUserInputs }) => {
  const { formValues } = useInputDataContext();

  const handleUserClick = (key: string, value: number): void => {
    type keyType = keyof typeof formValues;
    const userKey = key as keyType;
    const newInput = formValues[userKey];
    newInput.value = value;
    setUserInputs({ ...formValues, [userKey]: newInput });
  };

  return (
    <form>
      <Subtitle>Inputs</Subtitle>
      {Object.entries(formValues).map((input) => {
        return (
          <Input
            key={input[0]}
            userInput={input[1]}
            onChange={(value: number) => handleUserClick(input[0], value)}
          />
        );
      })}
    </form>
  );
};

export default Inputs;
