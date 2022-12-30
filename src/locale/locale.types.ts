export type Resources = Record<string, Translation>;

export interface Translation {
  translation: Record<Phrases, string>;
}

export type Phrases =
  | 'Inputs'
  | 'Loan amount'
  | 'Bank gross'
  | 'Period'
  | 'Monthly payment'
  | 'Custom start date'
  | 'Overpayments'
  | 'Date'
  | 'Options'
  | 'Value'
  | 'Summary'
  | 'Total gross'
  | 'Total cost'
  | 'Rates'
  | 'Payment last day'
  | 'Repeat period'
  | 'Occurrences'
  | 'Installment rate'
  | 'Save config'
  | 'Clear config'
  | 'Values saved in storage'
  | 'Saving values failed'
  | 'Values cleared'
  | 'Values clear failed';
