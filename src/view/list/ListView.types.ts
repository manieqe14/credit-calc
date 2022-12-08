import { ComponentPropsWithoutRef, FC } from 'react';
import { ListItemProps, TypographyProps } from '@mui/material';

export interface ListViewProps extends Omit<ComponentPropsWithoutRef<'ul'>, "onClick"> {
  onClick: (id: string) => void;
}

export interface ListItemComposition extends ListItemProps {
  Title?: FC<TypographyProps>;
}
