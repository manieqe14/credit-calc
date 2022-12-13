import { makeAutoObservable } from "mobx";
import { InputNames, Installment, OptionsObj, Overpayment, UserInputs } from "../components/types";
import { generateDatesArray } from "../Utils/generateDatesArray";
import { InitialValues } from "../Utils/initialValues";
import { countInstallment, odsetki } from "../Utils/Helpers";

export default class Store {

  userInputs: UserInputs;

  options: OptionsObj;

  public overpayments: Overpayment[] = [];


  constructor({ formValues, options }: typeof InitialValues) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.userInputs = formValues;
    this.options = options;
  }

  get dates(): Date[] {
    return generateDatesArray(this.options.startDate, this.userInputs.period.value)
  }

  public setOptions(options: OptionsObj): void {
    this.options = options;
  }

  public get endDate(): Date {
    return this.dates.at(-1) ?? new Date();
  }

  public get startDate(): Date {
    return this.dates.at(1) ?? new Date();
  }

  public set startDate(startDate: Date) {
    this.options.startDate = startDate;
  }

  public get totalCost(): number {
    if (this.installments.length === 0) {
      return 0;
    }
    if (this.options.constRateOverpayment) {
      return(
        this.installments.filter((inst) => inst.value > 0).length *
        this.options.constRateOverpaymentValue +
        this.overpaymentsTotal
      )
    } else {
      return this.installments.length * this.installments[0].value + this.overpaymentsTotal;
    }
  }

  public addOverpayment(item: Overpayment): void {
    this.overpayments.push(item);
  }

  public deleteOverpayment(id: string): void {
    this.overpayments = this.overpayments.filter(item => item.uuid !== id);
  }

  public get installments(): Installment[] {
      let amountLeft: number = this.userInputs.amount.value;
      let overpaymentsLeft = this.overpayments;
      const result: Installment[] = [];

      for (
        let index = 0;
        index < this.userInputs.period.value && amountLeft > 0;
        index++
      ) {
        const rata: number = countInstallment(
          amountLeft,
          this.userInputs.wibor.value + this.userInputs.bankgross.value,
          this.userInputs.period.value - index
        );
        amountLeft =
          amountLeft -
          rata +
          odsetki(
            amountLeft,
            this.userInputs.bankgross.value + this.userInputs.wibor.value
          );
        while (
          overpaymentsLeft.length > 0 &&
          overpaymentsLeft[0].date < this.dates[index]
          ) {
          amountLeft = amountLeft - overpaymentsLeft[0].value;
          overpaymentsLeft = overpaymentsLeft.slice(1, overpaymentsLeft.length);
        }

        if (this.options.constRateOverpayment) {
          amountLeft = amountLeft - this.options.constRateOverpaymentValue + rata;
        }
        result.push({ value: rata, date: this.dates[index] });
      }
      return(result);
  }

  public get overpaymentsTotal(): number {
      if (this.overpayments.length === 0) return 0;
      return (
        this.overpayments.reduce<({value: number, date: Date})>((prev, current) => {
          return { value: current.value + prev.value, date: new Date() };
        }, {value: 0, date: new Date()}).value
      );
  }

  public setUserInput(key: InputNames, value: number): void {
    this.userInputs = { ...this.userInputs, [key]: {...this.userInputs[key], value } };
  }
}