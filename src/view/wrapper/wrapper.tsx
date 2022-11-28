import { styled } from '@mui/material';

export const Wrapper = styled('div')(({ theme }) => ({
  margin: '10px',
  padding: '1rem',
  border: `1px solid ${theme.palette.grey[100]}`,
  borderRadius: '0.5rem',
}));
