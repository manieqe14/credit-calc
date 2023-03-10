import { HolidayDate } from '../../view/list/ListView.types';
import { sortHolidayMonths } from '../sortHolidayMonths';

describe('Test for sorting holiday months', () => {
  const fakeHolidayMonths: HolidayDate[] = [
    {
      month: 3,
      year: 2025,
    },
    {
      month: 3,
      year: 2024,
    },
    {
      month: 2,
      year: 2025,
    },
    {
      month: 5,
      year: 2024,
    },
  ];

  it('Should sort holiday months', () => {
    expect(sortHolidayMonths(fakeHolidayMonths)).toMatchInlineSnapshot(`
      Array [
        Object {
          "month": 3,
          "year": 2024,
        },
        Object {
          "month": 5,
          "year": 2024,
        },
        Object {
          "month": 2,
          "year": 2025,
        },
        Object {
          "month": 3,
          "year": 2025,
        },
      ]
    `);
  });
});
