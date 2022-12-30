import { ComponentPropsWithoutRef, FC, ReactElement } from 'react';
import { ListItemProps, ListProps, TypographyProps } from '@mui/material';

export interface ListViewProps
  extends Omit<ComponentPropsWithoutRef<'ul'>, 'onClick'>,
    Omit<ListProps, 'onClick'> {
  onClick?: (id: string) => void;
  onDelete?: (id: string) => void;
  children: ReactElement[];
  noBorder?: boolean;
  row?: number;
}

export interface ListItemComposition extends Omit<ListItemProps, 'id'> {
  id: string;
  active?: boolean;
  Title?: FC<TypographyProps>;
  Date?: FC<TypographyProps>;
  Info?: FC<TypographyProps>;
}

export interface ListViewItemDateProps extends TypographyProps {
  date: Date;
}

export interface VacationDate {
  month: number;
  year: number;
}
