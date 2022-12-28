import { List } from '@mui/material';
import React, { Children, cloneElement, useMemo } from 'react';
import { ListViewProps } from './ListView.types';
import Provider, { ListViewContext } from '../../context/ListViewContext';

function ListView({
  children,
  onClick,
  onDelete,
  noBorder,
  row,
  ...props
}: ListViewProps): JSX.Element {
  const context = useMemo(
    (): ListViewContext => ({ onClick, onDelete, noBorder }),
    [onClick, onDelete, noBorder]
  );

  return (
    <Provider value={context}>
      <List
        sx={row === true ? { display: 'flex', flexDirection: 'row' } : null}
        {...props}
      >
        {Children.map(children, (el, i) =>
          cloneElement(el, { key: i, index: i })
        )}
      </List>
    </Provider>
  );
}

export default ListView;
