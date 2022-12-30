import { makeAutoObservable } from 'mobx';
import {
  InputNames,
  Installment,
  OptionsObj,
  Overpayment,
  OverpaymentDate,
  UserInputs,
} from '../components/types';
import { generateDatesArray } from '../Utils/generateDatesArray';
import { InitialValues } from '../Utils/initialValues';
import { countInstallment, odsetki } from '../Utils/Helpers';
import { clearStorageData, saveDataToStorage } from '../Utils/dataFromStorage';
import { Message, messages } from './messages';
import { isEmpty, isNil } from 'ramda';
import { overpaymentsReduce } from '../Utils/overpaymentsReduce';

export default class Store {
  userInputs: UserInputs;

  options: OptionsObj;

  public overpayments: Overpayment[];
  showBanner: boolean;
  message: Message;
  error: boolean;

  constructor({ formValues, options, overpayments }: typeof InitialValues) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.userInputs = formValues;
    this.options = options;
    this.overpayments = overpayments;
    this.showBanner = false;
    this.message = messages.saveStorage;
    this.error = false;
  }

  get overpaymentDates(): OverpaymentDate[] {
    return this.overpayments.reduce<OverpaymentDate[]>((acc, curr) => {
      if (curr.repeatPeriod !== undefined) {
        return [...acc];
      } else {
        return [...acc, { date: curr.date, value: curr.value }];
      }
    }, []);
  }

  public setOptions(options: Partial<OptionsObj>): void {
    this.options = { ...this.options, ...options };
  }

  get dates(): Date[] {
    return generateDatesArray(
      this.options.startDate,
      this.userInputs.period.value
    );
  }

  public saveValuesInStorage(): void {
    const values = {
      formValues: this.userInputs,
      options: this.options,
      overpayments: this.overpayments,
    };

    saveDataToStorage(values);

    this.message = messages.saveStorage;
    this.showBanner = true;
  }

  public clearData(): void {
    const { formValues, options, overpayments } = InitialValues;
    this.userInputs = formValues;
    this.options = options;
    this.overpayments = overpayments;

    clearStorageData();

    this.showBanner = true;
    this.message = messages.clear;
    this.error = false;
  }

  public get endDate(): Date {
    return this.dates.at(-1) ?? new Date();
  }

  public get startDate(): Date {
    return this.options.startDate;
  }

  public set startDate(startDate: Date) {
    this.options.startDate = startDate;
  }

  public get totalCost(): number {
    if (this.installments.length === 0) {
      return 0;
    }
    if (this.options.constRateOverpayment) {
      return (
        this.installments.filter((inst) => inst.value > 0).length *
          this.options.constRateOverpaymentValue +
        this.overpaymentsTotal
      );
    } else {
      return (
        this.installments.length * this.installments[0].value +
        this.overpaymentsTotal
      );
    }
  }

  public addOverpayment(item: Overpayment): void {
    this.overpayments.push(item);
  }

  public deleteOverpayment(id: string): void {
    this.overpayments = this.overpayments.filter((item) => item.uuid !== id);
  }

  public get installments(): Installment[] {
    const gross = this.userInputs.wibor.value + this.userInputs.bankgross.value;

    const result = this.dates.reduce<{
      amountLeft: number;
      installments: Installment[];
    }>(
      (acc, curr, index) => {
        const installment = countInstallment(
          acc.amountLeft,
          gross,
          this.userInputs.period.value - index
        );

        const amountLeft = this.options.constRateOverpayment
          ? acc.amountLeft - this.options.constRateOverpaymentValue
          : acc.amountLeft - installment + odsetki(acc.amountLeft, gross);

        const overpayments = this.overpaymentDates.filter((overpayment) => {
          if (isNil(acc.installments.at(-1)?.date)) {
            return overpayment.date < curr;
          }
          return (
            overpayment.date > acc.installments.at(-1).date &&
            overpayment.date < curr
          );
        });

        return {
          installments: [
            ...acc.installments,
            { date: curr, value: installment },
          ],
          amountLeft: isEmpty(overpayments)
            ? amountLeft
            : amountLeft - overpaymentsReduce(overpayments),
        };
      },
      { amountLeft: this.userInputs.amount.value, installments: [] }
    );

    return result.installments.filter((installment) => installment.value > 0);
  }

  get overpaymentsTotal(): number {
    return overpaymentsReduce(this.overpaymentDates);
  }

  public setUserInput(key: InputNames, value: number): void {
    this.userInputs = {
      ...this.userInputs,
      [key]: { ...this.userInputs[key], value },
    };
  }

  public hideBanner(): void {
    this.showBanner = false;
  }
}
