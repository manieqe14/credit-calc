import {
  IconButton,
  ListItem,
  Typography,
  TypographyProps,
} from '@mui/material';
import React, { FC, ReactElement } from 'react';
import { ListItemComposition, ListViewItemDateProps } from './ListView.types';
import { MutedText } from '../titles/text';
import { useListViewContext } from '../../context/ListViewContext';
import { isNil } from 'ramda';
import { getFormattedDate } from '../../Utils/Helpers';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  ActiveStyle,
  ListViewItemHover,
  ListViewItemStyle,
} from './ListView.styles';

const ListViewItem = ({
  children,
  ...props
}: ListItemComposition): ReactElement => {
  const { Title, id, active = false, ...parentProps } = props;
  const { onClick, onDelete, noBorder = false, row = 1 } = useListViewContext();

  return (
    <ListItem
      alignItems="flex-start"
      {...(isNil(onClick) ? null : { onClick: () => onClick(id) })}
      sx={{
        ...(active ? ActiveStyle : null),
        ...ListViewItemStyle(noBorder, row),
        ...(isNil(onClick) ? null : ListViewItemHover),
      }}
      {...parentProps}
      secondaryAction={
        onDelete != null ? (
          <IconButton
            edge="end"
            size="small"
            onClick={() => !isNil(onDelete) && onDelete(id)}
          >
            <RemoveIcon />
          </IconButton>
        ) : null
      }
    >
      {children}
    </ListItem>
  );
};

const ListViewItemTitle: FC<TypographyProps> = ({
  children,
  ...props
}: TypographyProps) => {
  return (
    <Typography component={'span'} {...props}>
      {children}
    </Typography>
  );
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
    <Typography sx={{ fontSize: '0.65rem', opacity: 0.9 }}>
      {children}
    </Typography>
  );
};

ListViewItem.Title = ListViewItemTitle;
ListViewItem.Date = ListViewItemDate;
ListViewItem.Info = ListViewItemInfo;

export default ListViewItem;
