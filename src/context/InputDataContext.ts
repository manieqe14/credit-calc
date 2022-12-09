import { InitialValues } from '../Utils/initialValues';
import { createContext, useContext } from 'react';
import { OptionsObj, OverpaymentDate, UserInputs } from '../components/types';

interface InputDataInterface {
  formValues: UserInputs;
  options: OptionsObj;
  overpaymentDatesHandler?: (dates: OverpaymentDate[]) => void;
}

export const InputDataContext: React.Context<InputDataInterface> =
  createContext(InitialValues);

export const useInputDataContext = (): InputDataInterface => {
  const context = useContext(InputDataContext);

  if (context === undefined) {
    const message = 'Form values context values undefined';
    console.error(message);
    throw new Error(message);
  }

  return context;
};
