import { rounder } from '../../Utils/Helpers';
import React from 'react';
import { InitialValues } from '../../Utils/initialValues';
import { useStore } from '../../context/store.context';
import { Wrapper } from '../../view/wrapper/wrapper';
import { Subtitle } from '../../view/titles/titles';
import { Box, Divider, DividerProps } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { SummaryElement } from './Summary.types';
import { isNil } from 'ramda';
import { numberToMonth } from '../../Utils/numberToMonth';

const Summary: React.FC = () => {
  const store = useStore();
  const { t, i18n } = useTranslation();
  const { totalCost, installments, totalGross } = store;

  const rates = installments.length;
  const lastInstallmentDate = installments.at(-1)?.date;

  const summaryElements: SummaryElement[] = [
    {
      title: 'Total gross',
      value: `${rounder(totalGross)} ${
        InitialValues.formValues.bankgross.unit
      }`,
    },
    {
      title: 'Total cost',
      value: `${rounder(totalCost)} ${InitialValues.formValues.amount.unit}`,
    },
    {
      title: 'Payment last month',
      value: `${
        isNil(lastInstallmentDate)
          ? ''
          : `${numberToMonth(
              lastInstallmentDate.getMonth(),
              i18n.language
            )} ${lastInstallmentDate.getFullYear()}`
      }`,
    },
    { title: 'Rates', value: rates.toString() },
  ];

  return (
    <Wrapper sx={{ textAlign: 'center' }}>
      <Subtitle>{t('Summary')}</Subtitle>
      {summaryElements.map(({ title, value }) => (
        <React.Fragment key={title}>
          <Divider sx={{ fontSize: '0.75em', opacity: 0.7 }} {...dividerProps}>
            {t(title).toUpperCase()}
          </Divider>
          <Box sx={{ marginBottom: '0.5rem' }}>{value}</Box>
        </React.Fragment>
      ))}
    </Wrapper>
  );
};

export default observer(Summary);

const dividerProps: DividerProps = {
  textAlign: 'center',
};
