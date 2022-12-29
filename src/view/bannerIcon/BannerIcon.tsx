import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import React, { ReactElement } from 'react';
import { BannerVariant } from '../../components/types';
import { BannerIconStyle } from './BannerIcon.styles';

const BannerIcon: React.FC<{ variant: BannerVariant }> = ({
  variant,
}): ReactElement => {
  if (variant === 'success') {
    return <DoneIcon sx={BannerIconStyle(variant)} />;
  } else {
    return <ClearIcon sx={BannerIconStyle(variant)} />;
  }
};

export default BannerIcon;
