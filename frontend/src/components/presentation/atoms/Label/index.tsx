import { HTMLProps } from 'react';
import cs from 'classnames';

import classes from './index.module.scss';

export interface ClassNameProps {
  label?: string;
}

export interface ILabelProps extends HTMLProps<HTMLLabelElement> {
  classNames?: ClassNameProps;
}

const Label = (
  {
    classNames,
    children,
    ...props
  }: ILabelProps) => (
  <label
    className={cs(classes.label, classNames?.label)}
    {...props}
  >
    {children}
  </label>
);

export default Label;
