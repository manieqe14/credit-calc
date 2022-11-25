import { Installment } from '../types';

export interface SummaryPropsInterface {
  installments: Installment[];
  overpaymentsTotal: number;
}
