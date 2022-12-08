import { ComponentProps, FC, PropsWithChildren } from 'react';
import { TypographyProps } from '@mui/material';

export interface ListViewProps extends ComponentProps<'ul'> {}

export interface ListItemComposition extends FC<PropsWithChildren<{}>> {
  Title?: FC<TypographyProps>;
}
