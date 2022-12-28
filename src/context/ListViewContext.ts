import { createContext, useContext } from 'react';
import { isEmpty } from 'ramda';

export interface ListViewContext {
  onDelete?: (id: string) => void;
  onClick?: (id: string) => void;
  noBorder?: boolean;
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
