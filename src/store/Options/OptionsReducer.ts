import { Reducer } from 'react';
import { OptionsObj } from '../../components/types';
import { OptionsActionInterface } from './OptionsAction';

export const optionsReducer: Reducer<OptionsObj, OptionsActionInterface> = (
  state,
  action
) => {
  switch (action.type) {
    case 'setActive':
      return { ...state, constRateOverpayment: action.payload.value };
    case 'setValue':
      return {
        ...state,
        constRateOverpaymentValue: parseFloat(action.payload.value),
      };
    case 'setDate':
      return { ...state, startDate: action.payload.value };
    default:
      return state;
  }
};
