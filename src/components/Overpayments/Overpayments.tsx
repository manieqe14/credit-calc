import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { getDateForInput } from '../../Utils/Helpers';
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
import ListViewItem from '../../view/list/ListViewItem';
import { isNil } from 'ramda';

export const Overpayments = ({ endDate }: { endDate: Date }): ReactElement => {
  const { formValues, overpaymentDatesHandler } = useInputDataContext();
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
    if (overpayment.date.getTime() > endDate.getTime()) {
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
    if (isNil(overpaymentDatesHandler)) {
      return;
    }
    const result: OverpaymentDate[] = [];
    for (const overpaymentObj of overpayments) {
      if (
        overpaymentObj.repeatPeriod !== undefined &&
        overpaymentObj.occurrences !== undefined
      ) {
        const loopDate = new Date(overpaymentObj.date);
        let occurrencesCounter = 0;
        while (
          loopDate.getTime() < endDate.getTime() &&
          occurrencesCounter < overpaymentObj.occurrences
        ) {
          result.push({
            date: new Date(loopDate),
            value: overpaymentObj.value,
          });
          occurrencesCounter++;
          switch (overpaymentObj.repeatPeriod) {
            case Period.MONTH:
              loopDate.setMonth(loopDate.getMonth() + 1);
              break;
            case Period.QUARTER:
              loopDate.setMonth(loopDate.getMonth() + 3);
              break;
            case Period.YEAR:
              loopDate.setFullYear(loopDate.getFullYear() + 1);
              break;
            default:
              loopDate.setFullYear(loopDate.getFullYear() + 1);
              break;
          }
        }
      } else {
        result.push({ date: overpaymentObj.date, value: overpaymentObj.value });
      }
    }

    overpaymentDatesHandler(
      result.sort((date1, date2) => date1.date.getTime() - date2.date.getTime())
    );
  }, [overpayments, endDate]);

  const handleDeleteOverpayment = (id: string): void => {
    setOverpayments(overpayments.filter((item) => item.uuid !== id));
  };

  const overpaymentsList = (): JSX.Element => (
    <ListView onClick={handleDeleteOverpayment}>
      {overpayments.map((item) => (
        <ListViewItem id={item.uuid}>
          <ListViewItem.Title>
            {`${item.value} ${formValues.amount.unit}`}
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
      <Subtitle>Overpayments</Subtitle>
      <form>
        <TextInput
          id="overpayment-date"
          label="Date"
          type="date"
          value={getDateForInput(overpayment.date)}
          onChange={setDateHandler}
        />
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
        <RepeatingSectionWrapper>
          <CheckboxInput
            checked={repeat}
            label="repeat"
            onChange={() => setRepeat(!repeat)}
          />
          <SelectInput
            label="repeat-input"
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
