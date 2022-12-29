export interface OptionsActionInterface {
  type: 'setActive' | 'setValue' | 'setDate';
  payload: any;
}

const SetActive = (value: boolean): OptionsActionInterface => ({
  type: 'setActive',
  payload: { constRateOverpayment: value },
});

const SetValue = (value: string): OptionsActionInterface => ({
  type: 'setActive',
  payload: { constRateOverpaymentValue: value },
});

const SetDate = (value: Date): OptionsActionInterface => ({
  type: 'setDate',
  payload: { startDate: value },
});

export default { SetDate, SetValue, SetActive };
