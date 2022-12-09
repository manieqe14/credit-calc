import { ComponentPropsWithoutRef, FC, ReactElement } from 'react';
import { ListItemProps, TypographyProps } from '@mui/material';

export interface ListViewProps
  extends Omit<ComponentPropsWithoutRef<'ul'>, 'onClick'> {
  onClick: (id: string) => void;
  children: ReactElement[];
}

export interface ListItemComposition extends ListItemProps {
  Title?: FC<TypographyProps>;
  Date?: FC<TypographyProps>;
  Info?: FC<TypographyProps>;
}
