import {
  CheckboxProps,
  SelectProps,
  StandardTextFieldProps,
} from '@mui/material';

export interface TextInputProps extends StandardTextFieldProps {
  suffix?: string;
}

export interface CheckboxInputProps extends CheckboxProps {
  label?: string;
  end?: boolean;
}

export interface SelectInputProps extends SelectProps {
  label: string;
}
