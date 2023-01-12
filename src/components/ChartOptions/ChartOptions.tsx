import React, { FC } from 'react';
import ListView from '../../view/list/ListView';
import { ChartOptionsProps } from './ChartOptions.types';
import ListViewItem from '../../view/list/ListViewItem';
import CheckboxInput from '../../view/inputs/checkboxInput';

const ChartOptions: FC<ChartOptionsProps> = ({
  datasets,
  handleClick,
}): JSX.Element => {
  return (
    <ListView sx={{ width: '20%', padding: '10px' }}>
      {Object.entries(datasets).map(([key, { label, visible }]) => (
        <ListViewItem key={key} id={key}>
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
