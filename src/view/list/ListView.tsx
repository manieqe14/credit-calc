import { List } from '@mui/material';
import React from 'react';
import { PropsWithChildren } from 'react';

const ListView: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return <List>{children}</List>;
};

export default ListView;
