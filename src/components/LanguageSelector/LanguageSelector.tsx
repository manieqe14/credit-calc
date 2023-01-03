import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from 'react-country-flag';
import { FlagImage } from './LanguageSelector.styles';
import ListView from '../../view/list/ListView';
import ListViewItem from '../../view/list/ListViewItem';
import { Language } from './LanguageSelector.types';

const Languages: Language[] = [
  {
    name: 'english',
    code: 'en',
    flagCode: 'us',
  },
  {
    name: 'polish',
    code: 'pl',
    flagCode: 'PL',
  },
];

const LanguageSelector = (): JSX.Element => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<string>('en');

  useEffect(() => {
    void i18n.changeLanguage(language);
  }, [language]);

  return (
    <ListView row={2} noBorder onClick={setLanguage}>
      {Languages.map((lang) => (
        <ListViewItem
          id={lang.code}
          key={lang.code}
          active={lang.code === language}
        >
          <ReactCountryFlag
            alt={`${lang.name} flag`}
            countryCode={lang.flagCode}
            svg
            style={FlagImage}
          />
        </ListViewItem>
      ))}
    </ListView>
  );
};

export default LanguageSelector;
