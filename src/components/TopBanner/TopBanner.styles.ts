import { SxProps } from '@mui/material';

export const BannerStyle = {
  boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
  padding: '1rem 2rem',
};

export const BannerWrapper = (showContent: boolean): SxProps => ({
  height: '50px',
  transition: 'all .5s',
  opacity: showContent ? 100 : 0,
});
