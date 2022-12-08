import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { getDateForInput, getFormattedDate } from '../../Utils/Helpers';
import { v4 as uuidv4 } from 'uuid';
import { useInputDataContext } from '../../context/InputDataContext';
import { Subtitle } from '../../view/titles/titles';
import TextInput from '../../view/inputs/textInput';
import { Wrapper } from '../../view/wrapper/wrapper';
import { Button, MenuItem } from '@mui/material';
import CheckboxInput from '../../view/inputs/checkboxInput';
import { RepeatingSectionWrapper } from './Overpayments.styles';
import SelectInput from '../../view/inputs/selectInput';
import ListView from '../../view/list/ListView';
import { Overpayment, OverpaymentDate, Period } from '../types';
import useOverpaymentsDates from '../../Utils/Hooks/useOverpaymentsDates';
import ListViewItem from '../../view/list/ListViewItem';

export const Overpayments = ({
  enddate,
  overpaymentDatesHandler,
}: {
  enddate: Date;
  overpaymentDatesHandler: (value: OverpaymentDate[]) => void;
}): ReactElement => {
  const { formValues } = useInputDataContext();
  const [overpaymentsDates] = useOverpaymentsDates([], enddate);
  const [overpayment, setOverpayment] = useState<Overpayment>({
    uuid: uuidv4(),
    value: 0,
    date: new Date(),
    repeatPeriod: Period.MONTH,
    occurrences: 1,
  });
  const [repeat, setRepeat] = useState(false);
  const [overpayments, setOverpayments] = useState<Overpayment[]>([]);

  const setDateHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setOverpayment((prev) => ({
      ...prev,
      date: event.target.valueAsDate ?? prev.date,
    }));
  };

  const addItem = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    if (overpayment.date.getTime() > enddate.getTime()) {
      alert('Date cannot be after last installment date!');
      return;
    }

    const newOverpayment = repeat
      ? overpayment
      : { ...overpayment, repeatPeriod: undefined };

    setOverpayment({ ...overpayment, uuid: uuidv4() });
    setOverpayments([...overpayments, newOverpayment]);
  };

  useEffect(() => {
    overpaymentDatesHandler(overpaymentsDates);
  }, [overpaymentsDates]);

  const handleDeleteOverpayment = (id: string): void => {
    setOverpayments(overpayments.filter((item) => item.uuid !== id));
  };

  const overpaymentslist = (): JSX.Element => (
    <ListView onClick={handleDeleteOverpayment}>
      {overpayments.map((item) => (
        <ListViewItem>
          <ListViewItem.Title>{getFormattedDate(item.date)}</ListViewItem.Title>
          <span>{item.value} PLN</span>
          {item.repeatPeriod != null && <span>{item.repeatPeriod}</span>}
        </ListViewItem>
      ))}
    </ListView>
  );

  return (
    <Wrapper>
      <Subtitle>Overpayments</Subtitle>
      <form>
        <div>
          <div>
            <TextInput
              id="overpayment-date"
              label="Date"
              type="date"
              value={getDateForInput(overpayment.date)}
              onChange={setDateHandler}
            />
          </div>
          <div>
            <TextInput
              id="overpayment-value"
              error={overpayment.value === 0}
              label="Value"
              type="number"
              value={overpayment.value}
              suffix={formValues.amount.unit}
              onChange={(event) =>
                setOverpayment({
                  ...overpayment,
                  value: parseFloat(event.target.value),
                })
              }
            />
          </div>
          <RepeatingSectionWrapper>
            <CheckboxInput
              checked={repeat}
              label="repeat"
              onChange={() => setRepeat(!repeat)}
            />
            <SelectInput
              label="Repeat"
              id="repeat-overpayment-selector"
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
              label="Occurences"
              id="occurrences-number"
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
        </div>
        <Button
          aria-label="Add overpayment button"
          disabled={overpayment.value === 0}
          onClick={addItem}
        >
          Add
        </Button>
      </form>
      {overpaymentslist()}
    </Wrapper>
  );
};
