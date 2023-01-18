import { HolidayDate } from '../../view/list/ListView.types';
import { dateToId, idToDate } from '../dateToId';

describe('Date to Id conversion', () => {
  it('Should convert date to string', () => {
    const date = new Date(231);

    expect(dateToId(date)).toMatchInlineSnapshot(
      `"{\\"month\\":0,\\"year\\":1970}"`
    );
  });

  it('Should convert holiday date to string', () => {
    const holidayDate: HolidayDate = { month: 3, year: 2023 };

    expect(dateToId(holidayDate)).toMatchInlineSnapshot(
      `"{\\"month\\":3,\\"year\\":2023}"`
    );
  });

  it('Should convert to HolidayDate', () => {
    const stringDate = `{"month": 3, "year": 2023 }`;

    expect(idToDate(stringDate)).toMatchInlineSnapshot(`
      Object {
        "month": 3,
        "year": 2023,
      }
    `);
  });
});
