import SaveIcon from '@mui/icons-material/Save';
import React from 'react';
import { useStore } from '../../context/store.context';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PersistenceIcon } from './Persistance.styles';

const Persistance: React.FC<{}> = () => {
  const store = useStore();
  const { t } = useTranslation();

  return (
    <Tooltip title={t('Save config')}>
      <SaveIcon sx={PersistenceIcon} onClick={store.saveValuesInStorage} />
    </Tooltip>
  );
};

export default Persistance;
