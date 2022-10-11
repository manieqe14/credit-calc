import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { zeroPad } from '../../Utils/Helpers';

export interface OverpaymentDate {
  date: Date;
  value: number;
}

export interface Overpayment extends OverpaymentDate {
  repeatPeriod?: Period | undefined;
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
  const [overpayment, setOverpayment] = useState<Overpayment>({
    value: 0,
    date: new Date(),
    repeatPeriod: Period.MONTH,
  });
  const [repeat, setRepeat] = useState(false);
  const [overpayments, setOverpayments] = useState<Overpayment[]>([]);

  const setDateHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const resultDate = new Date();
    const results = event.target?.value.match(
      /(?<year>\d{4})-(?<month>\d+)-(?<date>\d+)/
    );
    if (results?.groups !== undefined) {
      resultDate.setDate(parseInt(results.groups.date));
      resultDate.setMonth(parseInt(results.groups.month) - 1);
      resultDate.setFullYear(parseInt(results.groups.year));
      setOverpayment((prev) => {
        return { ...prev, date: resultDate };
      });
    }
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

    setOverpayments([...overpayments, newOverpayment]);
  };

  useEffect(() => {
    const result: OverpaymentDate[] = [];
    for (const overpaymentObj of overpayments) {
      if (overpaymentObj.repeatPeriod) {
        let loopDate = new Date(overpaymentObj.date);
        while (loopDate.getTime() < enddate.getTime()) {
          result.push({
            date: new Date(loopDate),
            value: overpaymentObj.value,
          });
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

  const handleAddOverpayment = (key: number) => {
    let newOverpayments = overpayments;
    newOverpayments.splice(key, 1);
    setOverpayments(newOverpayments);
  };

  return (
    <div className="card-sm">
      <h3>Overpayments</h3>
      <form>
        <div className="form-section">
          <label htmlFor="overpayment-date">Date</label>
          <input
            id="overpayment-date"
            type="date"
            value={`${overpayment.date.getFullYear()}-${zeroPad(
              overpayment.date.getMonth() + 1
            )}-${zeroPad(overpayment.date.getDate())}`}
            onChange={setDateHandler}
          />
        </div>
        <div className="form-section">
          <label htmlFor="overpayment-value">Value</label>
          <input
            id="overpayment-value"
            type="number"
            value={overpayment.value}
            onChange={(event) =>
              setOverpayment({
                ...overpayment,
                value: parseFloat(event.target.value),
              })
            }
          />
        </div>
        <div className="form-section">
          <input
            type="checkbox"
            checked={repeat}
            onChange={() => setRepeat(!repeat)}
          />
          <select
            aria-label="Repeating period"
            onChange={(event) =>
              setOverpayment({
                ...overpayment,
                repeatPeriod: event.target.value as Period,
              })
            }
            disabled={!repeat}
          >
            {Object.entries(Period).map((element) => (
              <option value={element[0]}>{element[0]}</option>
            ))}
          </select>
        </div>
        <button
          disabled={!overpayment.value || overpayment.value === 0}
          onClick={addItem}
        >
          Add
        </button>
      </form>
      <ul className="flex-container">
        {overpayments.map((item, index) => (
          <li
            key={index}
            className="badge-primary"
            onClick={() => handleAddOverpayment(index)}
          >
            <span>{`${item.date.getDate()}-${
              item.date.getMonth() + 1
            }-${item.date.getFullYear()}`}</span>
            <span>{item.value} PLN</span>
            {item.repeatPeriod && <span>{item.repeatPeriod}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};
