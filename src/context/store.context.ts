import { createContext, useContext } from "react";
import Store from "../store/store";

const StoreContext = createContext({} as Store);

export const useStore = () => {
  const context = useContext(StoreContext);

  if (context === undefined) {
    const message = 'Store error';
    console.error(message);
    throw new Error(message);
  }

  return context;
};

export default StoreContext;
