import React, { FC } from 'react';
import ListView from '../../view/list/ListView';
import { ChartOptionsProps } from './ChartOptions.types';
import ListViewItem from '../../view/list/ListViewItem';
import CheckboxInput from '../../view/inputs/checkboxInput';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ChartOptions: FC<ChartOptionsProps> = ({
  datasets,
  handleClick,
}): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <ListView sx={{ width: ['100%', null, '20%'], padding: '10px' }}>
      {Object.entries(datasets).map(([key, { label, visible, colour }]) => (
        <ListViewItem
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            fontSize: '1rem',
          }}
          key={key}
          id={key}
        >
          <CheckboxInput
            checked={visible}
            label={label}
            onClick={() => handleClick(key)}
          />
          <LinearScaleIcon sx={{ color: colour(theme), mr: '10px' }} />
          <div>{t(label)}</div>
        </ListViewItem>
      ))}
    </ListView>
  );
};

export default ChartOptions;
