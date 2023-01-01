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
      ...(inRow > 1 ? { marginRight: '5px' } : null)
    }
});

const spacing = (inRow: number): number => inRow === 1 ? 0 : 5*(inRow-1)/inRow;

const propertyName = (inRow: number): string => `&:not(:nth-of-type(${inRow}n))`;

export const ListViewItemHover = {
  '&:hover': {
    cursor: 'pointer',
  },
};

export const ActiveStyle2 = {
  webkitBoxShadow: (theme: Theme) =>
    `0px 0px 38px -9px ${theme.palette.primary.light}`,
  mozBoxShadow: (theme: Theme) =>
    `0px 0px 38px -9px ${theme.palette.primary.light}`,
  boxShadow: (theme: Theme) =>
    `0px 0px 38px -9px ${theme.palette.primary.light}`,
};

export const ActiveStyle = {
  boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
}
