import { makeAutoObservable } from 'mobx';
import {
  InputNames,
  Installment,
  OptionsObj,
  Overpayment,
  OverpaymentDate,
  Period,
  UserInputs,
} from '../components/types';
import { generateDatesArray } from '../Utils/generateDatesArray';
import { InitialValues } from '../Utils/initialValues';
import { countInstallment, odsetki, rounder } from '../Utils/Helpers';
import { clearStorageData, saveDataToStorage } from '../Utils/dataFromStorage';
import { Message, messages } from './messages';
import { isNil, min, repeat, sum } from 'ramda';
import { overpaymentsReduce } from '../Utils/overpaymentsReduce';
import { checkVacationMonth } from '../Utils/checkVacationMonth';
import { overpaymentsForDate } from '../Utils/overpaymentsForDate';
import { periodToNumber } from '../Utils/periodToNumber';
import { generateDate } from '../Utils/generateDate';

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
      if (!isNil(curr.repeatPeriod)) {
        const overs = repeat(curr, curr.occurrences)
          .map<OverpaymentDate>(({ date, value }, index) => ({
            date: generateDate(
              date,
              index * periodToNumber(curr.repeatPeriod as Period)
            ),
            value,
          }));

        return [...acc, ...overs];
      } else {
        return [...acc, { date: curr.date, value: curr.value }];
      }
    }, []);
  }

  public setOptions(options: Partial<OptionsObj>): void {
    this.options = { ...this.options, ...options };
  }

  get dates(): Date[] {
    if (isNil(this.userInputs.period.value)) {
      return [];
    }

    const datesLength =
      this.userInputs.period.value + this.options.vacationMonths.length;

    return generateDatesArray(this.options.startDate, datesLength);
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
    return sum(this.installments.map((installment) => installment.amountPaid));
  }

  public addOverpayment(item: Overpayment): void {
    this.overpayments.push(item);
  }

  public deleteOverpayment(id: string): void {
    this.overpayments = this.overpayments.filter((item) => item.uuid !== id);
  }

  public get installments(): Installment[] {
    const gross = this.userInputs.wibor.value + this.userInputs.bankgross.value;
    const initialReducerValue = {
      amountLeft: this.userInputs.amount.value,
      installments: [],
    };
    let vacationsBehind = 0;

    const result = this.dates.reduce<{
      amountLeft: number;
      installments: Installment[];
    }>((acc, curr, index) => {
      if (acc.amountLeft === 0) {
        return acc;
      }

      const vacationMonth = checkVacationMonth(this.options.vacationMonths, curr);

      const installment = countInstallment(
        acc.amountLeft,
        gross,
        this.userInputs.period.value + vacationsBehind - index, vacationMonth
      )

      if (vacationMonth) {
        vacationsBehind++;
      }

      const overpayments = overpaymentsForDate(
        this.overpaymentDates,
        acc.installments.at(-1)?.date,
        curr
      );
      const reducedOverpayments = overpaymentsReduce(overpayments);

      const amountPaid = min(
        this.options.constRateOverpayment
          ? this.options.constRateOverpaymentValue + reducedOverpayments
          : installment + reducedOverpayments,
        acc.amountLeft
      );

      return {
        installments: [
          ...acc.installments,
          { date: curr, value: installment, amountPaid },
        ],
        amountLeft: rounder(
          acc.amountLeft - amountPaid + odsetki(acc.amountLeft, gross)
        ),
      };
    }, initialReducerValue);
    return result.installments;
  }

  get overpaymentsTotal(): number {
    return overpaymentsReduce(this.overpaymentDates);
  }

  public setUserInput(key: InputNames, value: number): void {
    this.userInputs = {
      ...this.userInputs,
      [key]: {
        ...this.userInputs[key],
        value: isNaN(value) ? undefined : value,
      },
    };
  }

  public hideBanner(): void {
    this.showBanner = false;
  }
}
