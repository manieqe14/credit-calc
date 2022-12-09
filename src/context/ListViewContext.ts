import { createContext, useContext } from 'react';
import { isEmpty } from 'ramda';

export interface ListViewContext {
  onClick?: (id: string) => void;
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
