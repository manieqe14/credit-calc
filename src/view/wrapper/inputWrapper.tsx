import React from 'react';
import { ComponentType } from 'react';

export function inputWrapper<T>(Component: ComponentType<T>) {
  return (props: T) => {
    return <Component sx={{ margin: '5px' }} {...props} />;
  };
}
