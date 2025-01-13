import { ReactNode } from 'react';

import FieldContainer from '@/components/presentation/atoms/FieldContainer';
import Input, { IInputProps } from "@/components/presentation/atoms/Input";
import Label from '@/components/presentation/atoms/Label';

export interface ClassnamesProps {
  textField?: string;
}

export interface ITextFieldProps extends Omit<IInputProps, 'classNames'>{
  id: string;
  errorMessage?: ReactNode;
  labelMessage?: ReactNode;
  isErrored?: boolean;
  classNames?: ClassnamesProps;
}

function TextField({
  id,
  isErrored = false,
  errorMessage,
  labelMessage,
  classNames = {},
  ...props
}: ITextFieldProps) {
  return (
    <FieldContainer
      classNames={{ fieldContainer: classNames?.textField }}
      errorMessage={errorMessage}
    >
      {labelMessage
        && (
          <Label
            htmlFor={id}
          >
            {labelMessage}
          </Label>
        )}
      <Input
        id={id}
        isErrored={isErrored}
        type="text"
        {...props}
      />
    </FieldContainer>
  );
}

export default TextField;
