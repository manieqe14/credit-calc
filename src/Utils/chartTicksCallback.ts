import { InitialValues } from './initialValues';

export const chartTicksCallback = (value: string | number): string =>
  `${value} ${InitialValues.formValues.amount.unit}`;
