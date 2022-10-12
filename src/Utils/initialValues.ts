import { UserInputs } from "../components/Credit/types";

export const initialUserInputs: UserInputs = {
  amount: {
    name: "Wartość kredytu",
    value: 300000,
    unit: "zł",
    step: 1000
  },
  wibor: {
    name: "WIBOR",
    value: 6.5,
    unit: "%",
    step: 0.1
  },
  bankgross: {
    name: "Marża banku",
    value: 2.13,
    unit: "%",
    step: 0.1
  },
  period: {
    name: "Okres kreytowania",
    value: 25 * 12,
    unit: "miesięcy",
    step: 1
  }
};