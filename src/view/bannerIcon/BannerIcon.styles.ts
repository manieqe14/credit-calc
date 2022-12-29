import { BannerVariant } from '../../components/types';
import { SxProps } from '@mui/material';

export const BannerIconStyle = (variant: BannerVariant): SxProps => ({
  fill: variant === 'success' ? 'green' : 'red',
  marginRight: '0.5rem',
});
