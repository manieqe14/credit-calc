import useDataForChart from '../../Utils/Hooks/useDataForChart';
import React, { FC } from 'react';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Title,
  LineElement,
  Legend,
} from 'chart.js';
import { useStore } from '../../context/store.context';
import { observer } from 'mobx-react-lite';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Title,
  Legend
);

const Chart: FC = () => {
  const store = useStore();
  const { installments, options } = store;

  const chartData = useDataForChart({ installments, options });
  return <Line {...chartData} aria-label="installments chart" />;
};

export default observer(Chart);
