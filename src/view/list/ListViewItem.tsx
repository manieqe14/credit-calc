import {
  IconButton,
  ListItem,
  Typography,
  TypographyProps,
} from '@mui/material';
import React, { FC } from 'react';
import { ListItemComposition, ListViewItemDateProps } from './ListView.types';
import { MutedText } from '../titles/text';
import { useListViewContext } from '../../context/ListViewContext';
import { isNil } from 'ramda';
import { getFormattedDate } from '../../Utils/Helpers';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  ActiveStyle,
  ListViewItemHover,
  ListViewItemStyle,
} from './ListView.styles';

function ListViewItem({ children, ...props }: ListItemComposition) {
  const { Title, id, active = false, ...parentProps } = props;
  const { onClick, onDelete, noBorder = false } = useListViewContext();

  return (
    <ListItem
      alignItems="flex-start"
      {...(isNil(onClick) ? null : { onClick: () => onClick(id) })}
      sx={{
        ...(active ? ActiveStyle : null),
        ...ListViewItemStyle(noBorder),
        ...(isNil(onClick) ? null : ListViewItemHover),
      }}
      {...parentProps}
      secondaryAction={
        onDelete != null ? (
          <IconButton edge="end" onClick={() => !isNil(onClick) && onClick(id)}>
            <DeleteIcon />
          </IconButton>
        ) : null
      }
    >
      {children}
    </ListItem>
  );
}

const ListViewItemTitle: FC<TypographyProps> = ({
  children,
  ...props
}: TypographyProps) => {
  return <Typography {...props}>{children}</Typography>;
};

const ListViewItemDate: FC<ListViewItemDateProps> = ({
  date,
  ...props
}: ListViewItemDateProps) => {
  return (
    <MutedText sx={{ fontSize: '0.75rem' }} {...props}>
      {getFormattedDate(date)}
    </MutedText>
  );
};

const ListViewItemInfo: FC<TypographyProps> = ({
  children,
}: TypographyProps) => {
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
