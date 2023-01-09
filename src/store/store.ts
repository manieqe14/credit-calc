import { makeAutoObservable } from 'mobx';
import {
  InputNames,
  Installment,
  OptionsInterface,
  Overpayment,
  OverpaymentDate,
  Period,
  UserInputs,
} from '../components/types';
import { generateDatesArray } from '../Utils/generateDatesArray';
import { InitialValues } from '../Utils/initialValues';
import { countInstallment, interest } from '../Utils/Helpers';
import { clearStorageData, saveDataToStorage } from '../Utils/dataFromStorage';
import { Message, messages } from './messages';
import { isNil, min, repeat, sum } from 'ramda';
import { periodToNumber } from '../Utils/periodToNumber';
import { generateDate } from '../Utils/generateDate';
import { HolidayDate } from '../view/list/ListView.types';

export default class Store {
  userInputs: UserInputs;

  options: OptionsInterface;

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
        const overs = repeat(curr, curr.occurrences).map<OverpaymentDate>(
          ({ date, value }, index) => ({
            date: generateDate(
              date,
              index * periodToNumber(curr.repeatPeriod as Period)
            ),
            value,
          })
        );

        return [...acc, ...overs];
      } else {
        return [...acc, { date: curr.date, value: curr.value }];
      }
    }, []);
  }

  public setOptions(options: Partial<OptionsInterface>): void {
    this.options = { ...this.options, ...options };
  }

  get dates(): Date[] {
    if (isNil(this.userInputs.period.value)) {
      return [];
    }

    const datesLength =
      this.userInputs.period.value + this.options.holidayMonths.length;

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

  public get totalGross(): number {
    return this.userInputs.wibor.value + this.userInputs.bankgross.value;
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

  public isHolidayMonth(
    date: Date,
    holidayMonths: HolidayDate[] = this.options.holidayMonths
  ): boolean {
    const holidayDate: HolidayDate = {
      month: date.getMonth(),
      year: date.getFullYear(),
    };

    return holidayMonths.includes(holidayDate);
  }

  availableOverpayments(prev: Date | undefined, curr: Date): number {
    const overpayments = this.overpaymentDates.filter((overpayment) =>
      isNil(prev)
        ? overpayment.date < curr
        : overpayment.date > prev && overpayment.date < curr
    );

    return overpayments.reduce<number>((acc, curr) => acc + curr.value, 0);
  }

  public get installments(): Installment[] {
    let holidaysBehind = 0;

    return this.dates.reduce<Installment[]>((acc, curr, index) => {
      const left = acc.at(-1)?.amountLeft ?? this.userInputs.amount.value;

      if (left === 0) {
        return acc;
      }

      const isHoliday = this.isHolidayMonth(curr);

      const installment = countInstallment(
        left,
        this.totalGross,
        this.userInputs.period.value + holidaysBehind - index,
        isHoliday
      );

      if (isHoliday) {
        holidaysBehind++;
      }

      const overpaymentsValue = this.availableOverpayments(
        acc.at(-1)?.date,
        curr
      );

      const amountPaid = min(
        (this.options.constRateOverpayment
          ? this.options.constRateOverpaymentValue
          : installment) + overpaymentsValue,
        left
      );
      const amountLeft = left - amountPaid + interest(left, this.totalGross);

      return [
        ...acc,
        { date: curr, value: installment, amountPaid, amountLeft },
      ];
    }, []);
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
