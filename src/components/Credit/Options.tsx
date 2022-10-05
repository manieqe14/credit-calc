import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { rounder } from "../../Utils/Helpers";
import React from 'react';
import {OptionsObj} from "./Credit";

export const Options = ({ options, setOptionsHandler } : {options: OptionsObj, setOptionsHandler: (options: OptionsObj) => void }) => {
  const [constRateOverpayment, setConstRateOverpayment] = useState(
    options.constRateOverpayment
  );
  const [constRateOverpaymentValue, setConstRateOverpaymentValue] = useState(
    options.constRateOverpaymentValue
  );

  useEffect(() => {
    setOptionsHandler({
      ...options,
      constRateOverpayment,
      constRateOverpaymentValue,
    });
  }, [constRateOverpayment, constRateOverpaymentValue]);

  return (
    <Form>
      <Form.Check
        checked={constRateOverpayment}
        type="checkbox"
        id="const-rate-montly-overpayment"
        label="Miesięczna kwota"
        onChange={() => setConstRateOverpayment(!constRateOverpayment)}
      />
      <Form.Control
        disabled={!constRateOverpayment}
        type="number"
        value={constRateOverpaymentValue}
        onChange={(event) =>
          setConstRateOverpaymentValue(rounder(parseFloat(event.target.value)))
        }
      />
    </Form>
  );
};
