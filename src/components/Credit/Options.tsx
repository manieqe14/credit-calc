import React, { ReactElement, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { OptionsObj } from './Credit';

export const Options = ({
  options,
  setOptionsHandler,
}: {
  options: OptionsObj;
  setOptionsHandler: (options: OptionsObj) => void;
}): ReactElement => {
  const [constRateOverpayment, setConstRateOverpayment] = useState(
    options.constRateOverpayment
  );
  const [constRateOverpaymentValue, setConstRateOverpaymentValue] = useState(
    options.constRateOverpaymentValue
  );

  const setOptions = (): void => {
    setOptionsHandler({
      ...options,
      constRateOverpayment,
      constRateOverpaymentValue,
    });
  };

  return (
    <div className="card-sm h-fit">
      <h3 className="subtitle">Monthly amount</h3>
      <Form className="overpayments-form">
        <Form.Check
          checked={constRateOverpayment}
          type="checkbox"
          id="const-rate-montly-overpayment"
          onChange={() => setConstRateOverpayment(!constRateOverpayment)}
        />
        <Form.Control
          disabled={!constRateOverpayment}
          type="number"
          value={constRateOverpaymentValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setConstRateOverpaymentValue(() => parseFloat(event.target.value))
          }
        />
        <Button
          className="primary-button"
          disabled={!constRateOverpayment && constRateOverpaymentValue < 1}
          onClick={setOptions}
        >
          OK
        </Button>
      </Form>
    </div>
  );
};
