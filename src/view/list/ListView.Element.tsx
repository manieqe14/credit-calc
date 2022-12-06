import { ListItem } from '@mui/material';
import React from 'react';
import { PropsWithChildren } from 'react';

const ListViewElement: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return <ListItem>{children}</ListItem>;
};

export default ListViewElement;
