import { SxProps } from '@mui/material';

export const ListViewItemStyle: SxProps<{ noBorder: boolean }> = ({
  noBorder,
}) => ({
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
