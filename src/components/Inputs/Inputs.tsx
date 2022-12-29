import { Input } from '../Input/Input';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../context/store.context';
import { Subtitle } from '../../view/titles/titles';
import { Wrapper } from '../../view/wrapper/wrapper';
import { action } from 'mobx';
import { InputNames } from '../types';
import { useTranslation } from 'react-i18next';
import Options from '../Options/Options';

const Inputs: React.FC<{}> = () => {
  const store = useStore();
  const { t } = useTranslation();

  const handleUserClick = (key: string, value: number): void => {
    store.setUserInput(key as InputNames, value);
  };

  return (
    <Wrapper>
      <Subtitle>{t('Inputs')}</Subtitle>
      {Object.entries(store.userInputs).map((input) => (
        <Input
          key={input[0]}
          userInput={input[1]}
          onChange={action((value: number) => handleUserClick(input[0], value))}
        />
      ))}

      <Options />
    </Wrapper>
  );
};

export default observer(Inputs);
