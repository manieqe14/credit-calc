import React, { ChangeEvent, ReactElement, useState } from 'react';
import { getDateForInput } from '../../Utils/Helpers';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from '../../context/store.context';
import { Subtitle } from '../../view/titles/titles';
import TextInput from '../../view/inputs/textInput';
import { Wrapper } from '../../view/wrapper/wrapper';
import { Button, MenuItem } from '@mui/material';
import CheckboxInput from '../../view/inputs/checkboxInput';
import { RepeatingSectionWrapper } from './Overpayments.styles';
import SelectInput from '../../view/inputs/selectInput';
import ListView from '../../view/list/ListView';
import { Overpayment, Period } from '../types';
import ListViewItem from '../../view/list/ListViewItem';
import { isNil } from 'ramda';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

const Overpayments = (): ReactElement => {
  const store = useStore();
  const { userInputs, overpayments } = store;
  const { t } = useTranslation();
  const [overpayment, setOverpayment] = useState<Overpayment>({
    uuid: uuidv4(),
    value: 0,
    date: new Date(),
    repeatPeriod: Period.MONTH,
    occurrences: 1,
  });
  const [repeat, setRepeat] = useState(false);

  const setDateHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setOverpayment((prev) => ({
      ...prev,
      date: event.target.valueAsDate ?? prev.date,
    }));
  };

  const addItem = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    if (overpayment.date.getTime() > store.endDate.getTime()) {
      alert('Date cannot be after last installment date!');
      return;
    }

    setOverpayment({ ...overpayment, uuid: uuidv4() });
    store.addOverpayment(
      repeat ? overpayment : { ...overpayment, repeatPeriod: undefined }
    );
  };

  const overpaymentsList = (): JSX.Element => (
    <ListView onDelete={store.deleteOverpayment}>
      {overpayments.map((item) => (
        <ListViewItem id={item.uuid} key={item.uuid}>
          <ListViewItem.Title>
            {`${item.value} ${userInputs.amount.unit}`}
          </ListViewItem.Title>
          <ListViewItem.Date date={item.date} />
          {!isNil(item.repeatPeriod) && (
            <ListViewItem.Info>{item.repeatPeriod}</ListViewItem.Info>
          )}
        </ListViewItem>
      ))}
    </ListView>
  );

  return (
    <Wrapper>
      <Subtitle>{t('Overpayments')}</Subtitle>
      <form style={{ marginLeft: '20px' }}>
        <TextInput
          id="overpayment-date"
          label={t('Date')}
          type="date"
          value={getDateForInput(overpayment.date)}
          onChange={setDateHandler}
        />
        <TextInput
          id="overpayment-value"
          error={overpayment.value === 0}
          label={t('Value')}
          type="number"
          value={overpayment.value}
          suffix={userInputs.amount.unit}
          onChange={(event) =>
            setOverpayment({
              ...overpayment,
              value: parseFloat(event.target.value),
            })
          }
        />
        <RepeatingSectionWrapper>
          <CheckboxInput
            checked={repeat}
            label="repeat"
            onChange={() => setRepeat(!repeat)}
          />
          <SelectInput
            label={t('Repeat period')}
            onChange={(event) =>
              setOverpayment({
                ...overpayment,
                repeatPeriod: event.target.value as Period,
              })
            }
            disabled={!repeat}
            value={overpayment.repeatPeriod}
          >
            {Object.entries(Period).map((element, _index) => (
              <MenuItem key={element[1]} value={element[1]}>
                {element[1]}
              </MenuItem>
            ))}
          </SelectInput>
          <SelectInput
            label={t('Occurrences')}
            value={overpayment.occurrences}
            onChange={(event) =>
              setOverpayment({
                ...overpayment,
                occurrences: parseFloat(event.target.value as string),
              })
            }
            disabled={!repeat}
          >
            {Array(15)
              .fill(0)
              .map((_element, index) => (
                <MenuItem key={index} value={index}>
                  {index}
                </MenuItem>
              ))}
          </SelectInput>
        </RepeatingSectionWrapper>
        <Button
          aria-label="Add overpayment button"
          variant="contained"
          disabled={overpayment.value === 0}
          onClick={addItem}
        >
          Add
        </Button>
      </form>
      {overpaymentsList()}
    </Wrapper>
  );
};

export default observer(Overpayments);
