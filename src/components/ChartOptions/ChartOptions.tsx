import React, { FC } from 'react';
import ListView from '../../view/list/ListView';
import { ChartOptionsProps } from './ChartOptions.types';
import ListViewItem from '../../view/list/ListViewItem';
import CheckboxInput from '../../view/inputs/checkboxInput';
import CircleIcon from '@mui/icons-material/Circle';
import { useTheme } from '@mui/material';

const ChartOptions: FC<ChartOptionsProps> = ({
  datasets,
  handleClick,
}): JSX.Element => {
  const theme = useTheme();

  return (
    <ListView sx={{ width: '20%', padding: '10px' }}>
      {Object.entries(datasets).map(([key, { label, visible, colour }]) => (
        <ListViewItem key={key} id={key}>
          <CircleIcon sx={{ color: colour(theme) }} />
          <ListViewItem.Title>{label}</ListViewItem.Title>
          <CheckboxInput
            checked={visible}
            label={label}
            end
            onClick={() => handleClick(key)}
          />
        </ListViewItem>
      ))}
    </ListView>
  );
};

export default ChartOptions;
