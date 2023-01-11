import { Phrases } from '../../locale/locale.types';

interface DataSet {
  label: Phrases;
  visible: boolean;
}

export type DataSets = Record<string, DataSet>;
