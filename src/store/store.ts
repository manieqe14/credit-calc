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
import { generateDate, generateDatesArray } from '../Utils/generateDatesArray';
import { InitialValues } from '../Utils/initialValues';
import { countInstallment, sumProp } from '../Utils/helpers';
import { clearStorageData, saveDataToStorage } from '../Utils/dataFromStorage';
import { Message, messages } from './messages';
import { compose, filter, isNil, min, repeat, whereEq } from 'ramda';
import { periodToNumber } from '../Utils/periodToNumber';
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
    return sumProp('amountPaid')(this.installments);
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
    return holidayMonths.some(
      whereEq({ month: date.getMonth(), year: date.getFullYear() })
    );
  }

  availableOverpayments(prev: Date | undefined, curr: Date): number {
    const filterHelper = (overpayment: OverpaymentDate): boolean =>
      isNil(prev)
        ? overpayment.date < curr
        : overpayment.date > prev && overpayment.date < curr;

    const withFilter = compose(sumProp('value'), filter(filterHelper));
    return withFilter(this.overpaymentDates);
  }

  public get totalInterest(): number {
    return sumProp('interest')(this.installments) ?? 0;
  }

  public get installments(): Installment[] {
    let holidaysBehind = 0;
    const gross = this.totalGross;

    if (isNil(gross)) {
      return [];
    }

    return this.dates.reduce<Installment[]>((acc, date, index) => {
      const previous = acc.at(-1) ?? {
        amountLeft: this.userInputs.amount.value,
        date: this.options.startDate,
      };

      if (previous.amountLeft === 0) {
        return acc;
      }

      const isHoliday = this.isHolidayMonth(date);

      const { value, interest } = countInstallment(
        previous.amountLeft,
        gross,
        this.userInputs.period.value + holidaysBehind - index
      )(isHoliday);

      if (isHoliday) {
        holidaysBehind++;
      }

      const overpaymentsValue = this.availableOverpayments(previous.date, date);

      const amountPaid = min(
        (this.options.constRateOverpayment
          ? this.options.constRateOverpaymentValue
          : value) + overpaymentsValue,
        previous.amountLeft
      );
      const amountLeft =
        amountPaid === previous.amountLeft
          ? 0
          : previous.amountLeft - amountPaid + interest;

      return [...acc, { date, value, amountPaid, amountLeft, interest }];
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
