import { HTMLProps } from 'react';

import cs from 'classnames';

import classes from './index.module.scss';

interface ClassNamesProps {
  input?: string;
  isErrored?: boolean;
}

export interface IInputProps extends HTMLProps<HTMLInputElement> {
  classNames?: ClassNamesProps;
  isErrored?: boolean;
}

const Input = (
  {
    classNames,
    isErrored,
    ...props
  }: IInputProps) => (
  <input
    {...props}
    className={cs(classes.input, classNames?.input, {
      [cs(classes.isErrored, classNames?.isErrored)]: isErrored,
    })}
  />
);

export default Input;
