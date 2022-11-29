import React, { ComponentType } from 'react';

export function inputWrapper<T>(Component: ComponentType<T>) {
  return (props: T) => {
    return <Component sx={{ margin: '0.5rem 15px' }} {...props} />;
  };
}
