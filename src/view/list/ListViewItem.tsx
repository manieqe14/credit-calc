import { ListItem, Typography, TypographyProps } from '@mui/material';
import React, { FC, PropsWithChildren } from 'react';
import { ListItemComposition } from './ListView.types';

function ListViewItem({ children, ...props }: ListItemComposition) {
  const { Title, ...parentProps } = props;
  return <ListItem {...parentProps}>{children}</ListItem>;
}

const ListViewItemTitle: FC<TypographyProps & PropsWithChildren<{}>> = ({
  children,
}) => {
  return <Typography>{children}</Typography>;
};

ListViewItem.Title = ListViewItemTitle;

export default ListViewItem;
