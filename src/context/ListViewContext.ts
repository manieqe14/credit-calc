import { createContext, useContext } from 'react';
import { isEmpty } from 'ramda';
import { VacationDate } from '../view/list/ListView.types';

export interface ListViewContext {
  onDelete?: (id: string) => void;
  onClick?: (id: string) => void;
  noBorder?: boolean;
  row?: number;
}

const Context: React.Context<ListViewContext> = createContext({});

export const useListViewContext = (): ListViewContext => {
  const context = useContext(Context);

  if (isEmpty(context)) {
    throw new Error(
      'useListViewContext should be wrapped with context provider'
    );
  }

  return context;
};

export default Context.Provider;
