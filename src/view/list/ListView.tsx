import { List } from '@mui/material';
import React from 'react';
import { ListViewProps } from './ListView.types';

function ListView({ children, ...props }: ListViewProps) {
  return <List>{children}</List>;
}

export default ListView;
