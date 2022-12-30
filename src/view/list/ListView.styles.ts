import { SxProps, Theme } from '@mui/material';

export const ListViewItemStyle = (
  noBorder: boolean,
  inRow: number
): SxProps => ({
  display: 'flex',
  flexDirection: 'column',
  ...(!noBorder ? { border: '1px solid rgba(0, 0, 0, 0.1)' } : null),
  borderRadius: '5px',
  marginBottom: '5px',
  width: `calc(100%/${inRow} - ${spacing(inRow)}px)`,
  [propertyName(inRow)]: {
    marginLeft: '5px',
    marginRight: '5px',
  },
});

const spacing = (inRow: number): number => {
  if (inRow === 1) {
    return 0;
  } else if (inRow === 2) {
    return 10;
  } else {
    return 10 * (inRow - 2);
  }
};

const propertyName = (inRow: number): string => {
  return `&:nth-child(${inRow}n + 2)`;
};

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
