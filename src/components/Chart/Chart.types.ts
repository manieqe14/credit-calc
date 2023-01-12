import { Phrases } from '../../locale/locale.types';
import { Installment } from '../types';
import { Theme } from '@mui/material';

export interface DatasetInterface {
  label: Phrases;
  visible: boolean;
  data: keyof Installment;
  colour: (theme: Theme) => string;
  yAxisID: string;
}

export type DatasetsInterface = Record<string, DatasetInterface>;
