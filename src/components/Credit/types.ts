export interface OptionsObj {
  constRateOverpayment: boolean;
  constRateOverpaymentValue: number;
}

export interface UserInput {
  name: string;
  value: number;
  unit: string;
  step: number;
}

export interface UserInputs {
  amount: UserInput;
  wibor: UserInput;
  bankgross: UserInput;
  period: UserInput;
}

export interface Installment {
  date: Date;
  value: number;
};

export interface DataForChart {
  labels: string[],
  datasets: Array<{
    label: string,
    data: number[],
    borderColor: string,
    backgroundColor: string
  }>
}