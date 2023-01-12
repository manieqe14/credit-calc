import useDataForChart from '../../Utils/Hooks/useDataForChart';
import React, { FC, useState } from 'react';
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
import { Wrapper } from '../../view/wrapper/wrapper';
import ChartOptions from '../ChartOptions/ChartOptions';
import { Box } from '@mui/material';
import { mapObjIndexed } from 'ramda';
import { DatasetsInterface } from './Chart.types';
import { Datasets } from '../../Utils/constants/datasets';

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

  const [data, setData] = useState<DatasetsInterface>(Datasets);

  const handleSetData = (id: string): void => {
    setData((prev) => {
      return mapObjIndexed(
        (value, key) =>
          key === id ? { ...value, visible: !value.visible } : value,
        prev
      );
    });
  };

  const chartData = useDataForChart({
    installments,
    options,
    datasets: data,
  });

  return (
    <Wrapper sx={{ display: 'flex', flexDirection: 'row' }} fullwidth>
      <ChartOptions datasets={data} handleClick={handleSetData} />
      <Box sx={{ width: '80%' }}>
        <Line {...chartData} aria-label="installments chart" />
      </Box>
    </Wrapper>
  );
};

export default observer(Chart);
