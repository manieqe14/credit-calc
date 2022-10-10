import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { ListGroup, Button, Form, Col, Row, Badge } from 'react-bootstrap';
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
    const newDate = new Date();
    const results = event.target?.value.match(
      /(?<year>\d{4})-(?<month>\d+)-(?<date>\d+)/
    );
    if (results?.groups !== undefined) {
      newDate.setDate(parseInt(results.groups.date));
      newDate.setMonth(parseInt(results.groups.month) - 1);
      newDate.setFullYear(parseInt(results.groups.year));
      setOverpayment((prev) => {
        return { ...prev, date: newDate };
      });
    }
  };

  const addItem = (): void => {
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

  return (
    <div className="card-sm">
      <Row>
        <h3>Overpayments</h3>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                id="overpayment-date"
                type="date"
                value={`${overpayment.date.getFullYear()}-${zeroPad(
                  overpayment.date.getMonth() + 1
                )}-${zeroPad(overpayment.date.getDate())}`}
                onChange={setDateHandler}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Value</Form.Label>
              <Form.Control
                type="number"
                value={overpayment.value}
                onChange={(event) =>
                  setOverpayment({
                    ...overpayment,
                    value: parseFloat(event.target.value),
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                checked={repeat}
                onChange={() => setRepeat(!repeat)}
              />
              <Form.Select
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
              </Form.Select>
            </Form.Group>
            <Button
              disabled={!overpayment.value || overpayment.value === 0}
              onClick={addItem}
            >
              Add
            </Button>
          </Form>
        </Col>
        <Col>
          <ListGroup>
            {overpayments.map((item, index) => (
              <ListGroup.Item
                key={index}
                onClick={() => {
                  setOverpayments(overpayments.splice(index, 1));
                }}
              >
                <Badge bg="secondary">{`${item.date.getDate()}-${
                  item.date.getMonth() + 1
                }-${item.date.getFullYear()}`}</Badge>
                {item.value} PLN
                <span>{item.repeatPeriod}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};
