import { ListItem, Typography, TypographyProps } from '@mui/material';
import React, { FC, PropsWithChildren } from 'react';
import { ListItemComposition } from './ListView.types';

const ListViewItem: React.FC<ListItemComposition> = ({
  children,
  ...props
}): ListItemComposition => {
  return <ListItem {...props}>{children}</ListItem>;
};

const ListViewItemTitle: FC<TypographyProps & PropsWithChildren<{}>> = ({
  children,
}) => {
  return <Typography>{children}</Typography>;
};

ListViewItem.Title = ListViewItemTitle;

export default ListViewItem;
