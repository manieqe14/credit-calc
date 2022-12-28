import { styled, Theme } from '@mui/material';

const iconMargins = '0.5rem';

export const InputRow = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

export const InputIconStyle = {
  marginLeft: iconMargins,
  marginRight: iconMargins,
  transition: 'all .1s ease-in-out',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: (theme: Theme) => theme.palette.primary.main,
    borderRadius: '10%',
  },
  '&:hover path': {
    color: 'white',
  },
  '&:active': {
    transform: 'scale(1.1)',
  },
};
