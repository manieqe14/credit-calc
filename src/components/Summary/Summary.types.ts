import { Installment } from '../types';

export interface SummaryPropsInterface {
  installments: Installment[];
  overpaymentsTotal: number;
}

export interface SummaryElement {
  title: string;
  value: string;
}
