import { SxProps, Theme } from '@mui/material';

export const ListViewItemStyle = (noBorder: boolean): SxProps => ({
  display: 'flex',
  flexDirection: 'column',
  ...(!noBorder ? { border: '1px solid rgba(0, 0, 0, 0.1)' } : null),
  borderRadius: '5px',
  marginBottom: '5px',
});

export const ListViewItemHover = {
  '&:hover': {
    cursor: 'pointer',
  },
};

export const ActiveStyle = {
  webkitBoxShadow: (theme: Theme) =>
    `0px 0px 38px -9px ${theme.palette.primary.light}`,
  mozBoxShadow: (theme: Theme) =>
    `0px 0px 38px -9px ${theme.palette.primary.light}`,
  boxShadow: (theme: Theme) =>
    `0px 0px 38px -9px ${theme.palette.primary.light}`,
};
