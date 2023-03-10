import Store from './store';
import { Overpayment, Period } from '../components/types';
import { InitialOptions, InitialValues } from '../Utils/initialValues';
import { HolidayDate } from '../view/list/ListView.types';

describe('Store tests', () => {
  const fakeOptions = { ...InitialOptions, startDate: new Date(2023, 10, 10) };
  const mockStore: Store = new Store({
    ...InitialValues,
    options: fakeOptions,
  });

  it('Should count summary values', () => {
    expect(mockStore.totalInterest).toMatchInlineSnapshot(`473564.56`);
    expect(mockStore.totalGross).toMatchInlineSnapshot(`9.530000000000001`);
    expect(mockStore.totalCost).toMatchInlineSnapshot(`773544.79`);
    expect(mockStore.installments).toMatchSnapshot();
  });

  it('Should count values with overpayment', () => {
    const fakeOverpayment: Overpayment = {
      occurrences: 5,
      uuid: 'fakeUuid',
      date: new Date(123546),
      value: 18000,
    };
    mockStore.addOverpayment(fakeOverpayment);
    expect(mockStore.installments).toMatchSnapshot();
  });

  it('Should count values with const rate amount', () => {
    mockStore.setOptions({
      constRateOverpayment: true,
      constRateOverpaymentValue: 3000,
    });

    expect(mockStore.installments).toMatchSnapshot();
  });

  it('Should check holiday month', () => {
    const holidayMonth: HolidayDate = { month: 11, year: 2024 };
    mockStore.setOptions({ holidayMonths: [holidayMonth] });

    expect(
      mockStore.isHolidayMonth(new Date(2024, 11, 10))
    ).toMatchInlineSnapshot(`true`);
  });

  it('Should return overpayments for given dates', () => {
    const fakeOverpayment: Overpayment = {
      occurrences: 5,
      repeatPeriod: Period.MONTH,
      uuid: 'fakeUuid',
      date: new Date(2024, 11, 17),
      value: 18000,
    };

    mockStore.addOverpayment(fakeOverpayment);

    expect(
      mockStore.availableOverpayments(
        new Date(2025, 2, 2),
        new Date(2025, 3, 20)
      )
    ).toMatchInlineSnapshot(`36000`);

    expect(
      mockStore.availableOverpayments(undefined, new Date(2026, 11, 11))
    ).toMatchInlineSnapshot(`108000`);
  });
});
