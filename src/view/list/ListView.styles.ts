import { SxProps, Theme } from '@mui/material';

export const ListViewItemStyle = (
  noBorder: boolean,
  inRow: number
): SxProps => ({
  display: 'flex',
  flexDirection: 'column',
  bgColor: 'background.paper',
  ...(!noBorder
    ? { borderWidth: `1px`, borderStyle: 'solid', borderColor: 'primary.light' }
    : null),
  borderRadius: '5px',
  marginBottom: '5px',
  width: `calc(100%/${inRow} - ${spacing(inRow)}px)`,
  [propertyName(inRow)]: {
    ...(inRow > 1 ? { marginRight: '5px' } : null),
  },
});

const spacing = (inRow: number): number =>
  inRow === 1 ? 0 : (5 * (inRow - 1)) / inRow;

const propertyName = (inRow: number): string =>
  `&:not(:nth-of-type(${inRow}n))`;

export const ListViewItemHover = {
  '&:hover': {
    cursor: 'pointer',
  },
};

export const ActiveStyle = {
  backgroundColor: (theme: Theme) => `${theme.palette.secondary.main}`,
  color: (theme: Theme) => `${theme.palette.primary.contrastText}`,
};
