import { UserInputs } from '../components/types';

const today = new Date();

const InitialFormValues: UserInputs = {
  amount: {
    name: 'Loan amount',
    value: 300000,
    unit: 'PLN',
    step: 1000,
  },
  wibor: {
    name: 'WIBOR',
    value: 6.5,
    unit: '%',
    step: 0.1,
  },
  bankgross: {
    name: 'Bank gross',
    value: 2.13,
    unit: '%',
    step: 0.1,
  },
  period: {
    name: 'Period',
    value: 25 * 12,
    unit: 'month(s)',
    step: 1,
  },
};
const InitialOptions = {
  constRateOverpayment: false,
  constRateOverpaymentValue: 0,
  startDate: today,
  vacationMonths: [],
};

export const InitialValues = {
  formValues: InitialFormValues,
  options: InitialOptions,
  overpayments: [],
};
