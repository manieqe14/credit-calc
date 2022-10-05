import React, { useEffect, useMemo, useRef, useState } from "react";
import { Amount } from "./Amount";
import "./Credit.css";
import { Gross } from "./Gross";
import { Period } from "./Period";
import { Wibor } from "./Wibor";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { countIntallment, odsetki } from "../../Utils/Helpers";
import { Options } from "./Options";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { rounder } from "../../Utils/Helpers";
import { OverPayments } from "./Overpayments";

const Credit = () => {
  let today = new Date();
  const [userInput, setUserInput] = useState({
    enteredAmount: 300000,
    enteredWibor: 6.5,
    enteredBankGross: 2.13,
    enteredPeriod: 25 * 12,
  });

  const [totalCost, setTotalCost] = useState(0);

  const [installment, setInstallment] = useState(
    Array(userInput.enteredPeriod).fill(1)
  );

  const dates = useRef(
    Array.from(Array(userInput.enteredPeriod).keys()).map(
      (index) => new Date(today.setMonth(today.getMonth() + 1))
    )
  );

  const [options, setOptions] = useState({
    constRateOverpayment: false,
    constRateOverpaymentValue: installment[0],
  });

  const [overpayments, setOverpayments] = useState([]);

  const overpaymentDates = useMemo(() => {
    let result = [];
    for (const overpayment of overpayments) {
      let temp = overpayment.date;
      while (
        overpayment.repeatPeriod &&
        temp.getTime() < dates.current[dates.current.length - 1].getTime()
      ) {
        result.push({ date: temp, value: overpayment.value });
        if (overpayment.repeatPeriod === "month") {
          temp.setMonth(temp.getMonth() + 1);
        } else if (overpayment.repeatPeriod === "year") {
          temp.setFullyear(temp.getFullYear() + 1);
        }
      }
    }
    console.log("result", result);
    return result;
  }, [overpayments]);

  const dataForChart = useMemo(() => {
    let temp = {
      labels: dates.current
        .map((date) => `${date.getMonth() + 1}.${date.getFullYear()}`)
        .slice(0, installment.filter((installment) => installment > 0).length),
      datasets: [
        {
          label: "Installment rate",
          data: installment.filter((installment) => installment > 0),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
    let labelForOverPayment = "Kwota płacona";

    if (options.constRateOverpayment) {
      temp.datasets.push({
        label: labelForOverPayment,
        data: Array(userInput.enteredPeriod)
          .fill(options.constRateOverpaymentValue)
          .slice(
            0,
            installment.filter((installment) => installment > 0).length
          ),
        borderColor: "rgb(0, 0, 25)",
        backgroundColor: "rgb(0, 0, 25)",
      });
    }
    return temp;
  }, [installment, dates, options]);

  useEffect(() => {
    let amountLeft = userInput.enteredAmount;
    let totalCostLocal = 0;
    setInstallment(
      installment.map((current, index) => {
        if (amountLeft > 0) {
          let rata = countIntallment({
            ...userInput,
            enteredAmount: amountLeft,
            enteredPeriod: userInput.enteredPeriod - index,
          });
          amountLeft =
            amountLeft -
            rata +
            odsetki(
              amountLeft,
              userInput.enteredBankGross + userInput.enteredWibor
            );
          if (options.constRateOverpayment) {
            amountLeft = amountLeft - options.constRateOverpaymentValue + rata;
          }

          return rata;
        } else return 0;
      })
    );
    if (options.constRateOverpayment) {
      setTotalCost(
        installment.filter((inst) => inst > 0).length *
          options.constRateOverpaymentValue
      );
    } else {
      setTotalCost(installment.reduce((partial, element) => partial + element));
    }
  }, [userInput, options]);

  return (
    <div>
      <form>
        <Amount
          value={userInput.enteredAmount}
          onAmountChange={(value) =>
            setUserInput({
              ...userInput,
              enteredAmount: value,
            })
          }
        />
        <Gross
          value={userInput.enteredBankGross}
          onGrossChange={(value) =>
            setUserInput({
              ...userInput,
              enteredBankGross: value,
            })
          }
        />
        <Wibor
          value={userInput.enteredWibor}
          onWiborChange={(value) =>
            setUserInput({
              ...userInput,
              enteredWibor: value,
            })
          }
        />
        <Period
          value={userInput.enteredPeriod}
          onPeriodChange={(value) =>
            setUserInput({
              ...userInput,
              enteredPeriod: value,
            })
          }
        />
      </form>
      <Container>
        <Row>
          <Col>Sumaryczne oprocentowanie</Col>
          <Col>
            {rounder(userInput.enteredWibor + userInput.enteredBankGross)} %
          </Col>
        </Row>
        <Row>
          <Col>Total cost</Col>
          <Col>{rounder(totalCost)} PLN</Col>
        </Row>
      </Container>

      <div>
        <Line data={dataForChart} />
      </div>
      <Options options={options} setOptionsHandler={setOptions} />
      <OverPayments
        overpayments={overpayments}
        overpaymentsHandler={setOverpayments}
      />
    </div>
  );
};

export default Credit;
