import { List } from '@mui/material';
import React, { useMemo } from 'react';
import { ListViewProps } from './ListView.types';
import Provider, { ListViewContext } from '../../context/ListViewContext';
import { isNil } from 'ramda';

function ListView({
  children,
  onClick,
  onDelete,
  noBorder,
  row,
  ...props
}: ListViewProps): JSX.Element {
  const context = useMemo(
    (): ListViewContext => ({ onClick, onDelete, noBorder, row }),
    [onClick, onDelete, noBorder, row]
  );

  return (
    <Provider value={context}>
      <List
        sx={
          !isNil(row)
            ? { display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }
            : null
        }
        {...props}
      >
        {children}
      </List>
    </Provider>
  );
}

export default ListView;
