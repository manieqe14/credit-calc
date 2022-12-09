import { List } from '@mui/material';
import React, { Children, cloneElement, useMemo } from 'react';
import { ListViewProps } from './ListView.types';
import Provider, { ListViewContext } from '../../context/ListViewContext';

function ListView({ children, onClick, ...props }: ListViewProps): JSX.Element {
  const context = useMemo((): ListViewContext => ({ onClick }), [onClick]);

  return (
    <Provider value={context}>
      <List {...props}>
        {Children.map(children, (el, i) =>
          cloneElement(el, { key: i, index: i })
        )}
      </List>
    </Provider>
  );
}

export default ListView;
