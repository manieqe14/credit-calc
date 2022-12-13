import { Input } from '../Input/Input';
import { observer } from "mobx-react-lite";
import React from 'react';
import { useStore } from "../../context/store.context";
import { Subtitle } from '../../view/titles/titles';
import { Wrapper } from '../../view/wrapper/wrapper';
import { action } from "mobx";
import { InputNames } from "../types";

const Inputs: React.FC<{}> = () => {
  const store = useStore();

  const handleUserClick = (key: string, value: number): void => {
    store.setUserInput(key as InputNames, value);
  };

  return (
    <Wrapper>
      <Subtitle>Inputs</Subtitle>
      {Object.entries(store.userInputs).map((input) => (
        <Input
          key={input[0]}
          userInput={input[1]}
          onChange={action((value: number) => handleUserClick(input[0], value))}
        />
      ))}
    </Wrapper>
  );
};

export default observer(Inputs);
