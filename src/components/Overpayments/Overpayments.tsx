import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { getDateForInput, isNanOrZero } from '../../Utils/Helpers';
import { v4 as uuidv4 } from 'uuid';
import { useInputDataContext } from '../../context/InputDataContext';
import { Subtitle } from '../../view/titles/titles';
import TextInput from '../../view/inputs/textInput';
import { Wrapper } from '../../view/wrapper/wrapper';
import SelectInput from '../../view/inputs/selectInput';
import { Button, MenuItem } from '@mui/material';
import CheckboxInput from '../../view/inputs/checkboxInput';

export interface OverpaymentDate {
  date: Date;
  value: number;
}

export interface Overpayment extends OverpaymentDate {
  repeatPeriod?: Period | undefined;
  occurrences?: number | undefined;
  uuid: string;
}

enum Period {
  MONTH = 'month',
  QUARTER = 'quarter',
  YEAR = 'year',
}

export const Overpayments = ({
  enddate,
  overpaymentDatesHandler,
}: {
  enddate: Date;
  overpaymentDatesHandler: (value: OverpaymentDate[]) => void;
}): ReactElement => {
  const { formValues } = useInputDataContext();
  const [overpayment, setOverpayment] = useState<Overpayment>({
    uuid: uuidv4(),
    value: 0,
    date: new Date(),
    repeatPeriod: Period.MONTH,
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
    const result: OverpaymentDate[] = [];
    for (const overpaymentObj of overpayments) {
      if (
        overpaymentObj.repeatPeriod !== undefined &&
        overpaymentObj.occurrences !== undefined
      ) {
        const loopDate = new Date(overpaymentObj.date);
        let occurrencesCounter = 0;
        while (
          loopDate.getTime() < enddate.getTime() &&
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
  }, [overpayments]);

  const handleDeleteOverpayment = (id: string): void => {
    setOverpayments(overpayments.filter((item) => item.uuid !== id));
  };

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
          <div>
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
              {Object.entries(Period).map((element, index) => (
                <MenuItem key={index} value={element[0]}>
                  {element[0]}
                </MenuItem>
              ))}
            </SelectInput>
            <SelectInput
              label="Overpayment Occurrences"
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
          </div>
        </div>
        <Button
          aria-label="Add overpayment button"
          disabled={overpayment.value === 0}
          variant="outlined"
          onClick={addItem}
        >
          Add
        </Button>
      </form>
      <ul>
        {overpayments.map((item, index) => (
          <li
            key={index}
            className="badge-primary"
            onClick={() => handleDeleteOverpayment(item.uuid)}
          >
            <span>{`${item.date.getDate()}-${
              item.date.getMonth() + 1
            }-${item.date.getFullYear()}`}</span>
            <span>{item.value} PLN</span>
            {item.repeatPeriod != null && <span>{item.repeatPeriod}</span>}
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};
