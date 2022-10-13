import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { getDateForInput, isNanOrZero } from "../../Utils/Helpers";
import { v4 as uuidv4 } from "uuid";

export interface OverpaymentDate {
  date: Date;
  value: number;
}

export interface Overpayment extends OverpaymentDate {
  repeatPeriod?: Period | undefined;
  uuid: string;
}

enum Period {
  MONTH = "month",
  QUARTER = "quarter",
  YEAR = "year",
}

export const Overpayments = ({
                               enddate,
                               overpaymentDatesHandler
                             }: {
  enddate: Date;
  overpaymentDatesHandler: (value: OverpaymentDate[]) => void;
}): ReactElement => {
  const [overpayment, setOverpayment] = useState<Overpayment>({
    uuid: uuidv4(),
    value: 0,
    date: new Date(),
    repeatPeriod: Period.MONTH
  });
  const [repeat, setRepeat] = useState(false);
  const [overpayments, setOverpayments] = useState<Overpayment[]>([]);

  const setDateHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setOverpayment(prev => ({ ...prev, date: event.target.valueAsDate ?? prev.date }));
  };

  const addItem = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    if (overpayment.date.getTime() > enddate.getTime()) {
      alert("Date cannot be after last installment date!");
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
      if (overpaymentObj.repeatPeriod !== undefined) {
        const loopDate = new Date(overpaymentObj.date);
        while (loopDate.getTime() < enddate.getTime()) {
          result.push({
            date: new Date(loopDate),
            value: overpaymentObj.value
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

  const handleDeleteOverpayment = (id: string): void => {
    setOverpayments(overpayments.filter(item => item.uuid !== id));
  };

  return (
    <div className="card-sm" style={{ width: "400px" }}>
      <h2>Overpayments</h2>
      <form>
        <div className="form-section">
          <label htmlFor="overpayment-date">Date</label>
          <input
            id="overpayment-date"
            type="date"
            value={getDateForInput(overpayment.date)}
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
                value: parseFloat(event.target.value)
              })
            }
          />
        </div>
        <div className="form-section">
          <label htmlFor="repeat-overpayment-selector">Reapat</label>
          <input
            type="checkbox"
            checked={repeat}
            onChange={() => setRepeat(!repeat)}
          />
          <select
            aria-label="Repeating period"
            id="repeat-overpayment-selector"
            onChange={(event) =>
              setOverpayment({
                ...overpayment,
                repeatPeriod: event.target.value as Period
              })
            }
            disabled={!repeat}
          >
            {Object.entries(Period).map((element, index) => (
              <option key={index} value={element[0]}>
                {element[0]}
              </option>
            ))}
          </select>
        </div>
        <button
          disabled={overpayment.value === 0}
          className={`${isNanOrZero(overpayment.value) ? "disabled " : ""}primary`}
          onClick={addItem}
        >
          Add
        </button>
      </form>
      <ul style={{ display: "flex", flexWrap: "wrap" }}>
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
    </div>
  );
};
