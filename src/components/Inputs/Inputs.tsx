import { Input } from '../Input/Input';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../context/store.context';
import { Subtitle } from '../../view/titles/titles';
import { Wrapper } from '../../view/wrapper/wrapper';
import { action } from 'mobx';
import { InputNames } from '../types';
import { useTranslation } from 'react-i18next';

const Inputs: React.FC = () => {
  const store = useStore();
  const { t } = useTranslation();

  const handleUserClick = (key: string, value: number): void => {
    store.setUserInput(key as InputNames, isNaN(value) ? 0 : value);
  };

  return (
    <Wrapper>
      <Subtitle>{t('Inputs')}</Subtitle>
      {Object.entries(store.userInputs).map(([key, input]) => (
        <Input
          key={key}
          userInput={input}
          onChange={action((value: number) => handleUserClick(key, value))}
        />
      ))}
    </Wrapper>
  );
};

export default observer(Inputs);
