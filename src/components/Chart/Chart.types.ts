import { Phrases } from '../../locale/locale.types';
import { Installment } from '../types';
import { PaletteOptions } from '@mui/material';

export interface DatasetInterface {
  label: Phrases;
  visible: boolean;
  data: keyof Installment;
  colour: ColourType | string;
  yAxisID: string;
}

export type DatasetsInterface = Record<string, DatasetInterface>;

export type ColourType = keyof Pick<PaletteOptions, 'primary' | 'secondary'>;
