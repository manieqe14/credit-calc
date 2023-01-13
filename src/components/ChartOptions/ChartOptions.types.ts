import { DatasetsInterface } from '../Chart/Chart.types';

export interface ChartOptionsProps {
  datasets: DatasetsInterface;
  handleClick: (id: string) => void;
}
