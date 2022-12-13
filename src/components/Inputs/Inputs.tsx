import { Input } from '../Input/Input';
import { observer } from "mobx-react-lite";
import React from 'react';
import { useStore } from "../../context/store.context";
import { Subtitle } from '../../view/titles/titles';
import { Wrapper } from '../../view/wrapper/wrapper';

const Inputs: React.FC<{}> = () => {
  const store = useStore();
  const { userInputs } = store;

  const handleUserClick = (key: string, value: number): void => {
    type keyType = keyof typeof userInputs;
    const userKey = key as keyType;
    const newInput = userInputs[userKey];
    newInput.value = value;
    store.userInputs = { ...userInputs, [userKey]: newInput };
  };

  return (
    <Wrapper>
      <Subtitle>Inputs</Subtitle>
      {Object.entries(userInputs).map((input) => (
        <Input
          key={input[0]}
          userInput={input[1]}
          onChange={(value: number) => handleUserClick(input[0], value)}
        />
      ))}
    </Wrapper>
  );
};

export default observer(Inputs);
