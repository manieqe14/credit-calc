export function numberToMonth(month: number, lang = 'en', long = true): string {
  switch (lang) {
    case 'pl':
      return long ? pl.long[month] : pl.short[month];
    default:
      return long ? en.long[month] : en.short[month];

  }
}

const en = {
  short: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  long: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

const pl = {
  short: [
    'Sty',
    'Lut',
    'Marz',
    'Kwi',
    'Maj',
    'Cze',
    'Lip',
    'Sie',
    'Wrz',
    'Paź',
    'Lis',
    'Gru',
  ],
  long: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
};
