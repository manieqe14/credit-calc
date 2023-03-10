import { countInstallment } from '../helpers';

describe('Helpers test', () => {
  const fakeAmount = 112000;
  const fakeGross = 9.13;
  const period = 270;

  it('Count Installment without holidays', () => {
    const holidays = false;

    expect(countInstallment(fakeAmount, fakeGross, period)(holidays))
      .toMatchInlineSnapshot(`
      Object {
        "interest": 840.46,
        "value": 979.66,
      }
    `);
  });

  it('Count Installment with holidays', () => {
    const holidays = true;

    expect(countInstallment(fakeAmount, fakeGross, period)(holidays))
      .toMatchInlineSnapshot(`
      Object {
        "interest": 0,
        "value": 0,
      }
    `);
  });

  it('Count Installment with 0 amount', () => {
    const holidays = true;

    expect(countInstallment(0, fakeGross, period)(holidays))
      .toMatchInlineSnapshot(`
      Object {
        "interest": 0,
        "value": 0,
      }
    `);
  });

  it('Count Installment with 0 period', () => {
    const holidays = true;

    expect(countInstallment(fakeAmount, fakeGross, 0)(holidays))
      .toMatchInlineSnapshot(`
      Object {
        "interest": 0,
        "value": 0,
      }
    `);
  });
});
