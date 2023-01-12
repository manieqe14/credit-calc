import { ColourType } from "../components/Chart/Chart.types";

export const isColourType = (x: any): x is ColourType => {
  return x === 'primary' || x === 'secondary';

}