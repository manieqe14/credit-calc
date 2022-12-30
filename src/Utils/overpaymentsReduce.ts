import { OverpaymentDate } from '../components/types';

export const overpaymentsReduce = (overpayments: OverpaymentDate[]): number =>
  overpayments.reduce<number>((acc, curr) => acc + curr.value, 0);