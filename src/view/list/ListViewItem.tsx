import { ListItem, Typography, TypographyProps } from '@mui/material';
import React from 'react';
import { ListItemComposition } from './ListView.types';
import { MutedText } from '../titles/text';

function ListViewItem({ children, ...props }: ListItemComposition) {
  const { Title, ...parentProps } = props;
  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '5px',
        marginBottom: '5px',
      }}
      {...parentProps}
    >
      {children}
    </ListItem>
  );
}

const ListViewItemTitle = ({ children }: TypographyProps) => {
  return <Typography>{children}</Typography>;
};

const ListViewItemDate = ({ children }: TypographyProps) => {
  return <MutedText sx={{ fontSize: '0.75rem' }}>{children}</MutedText>;
};

const ListViewItemInfo = ({ children }: TypographyProps) => {
  return (
    <Typography
      sx={{ fontSize: '0.75rem', position: 'absolute', right: '10px' }}
    >
      {children}
    </Typography>
  );
};

ListViewItem.Title = ListViewItemTitle;
ListViewItem.Date = ListViewItemDate;
ListViewItem.Info = ListViewItemInfo;

export default ListViewItem;
