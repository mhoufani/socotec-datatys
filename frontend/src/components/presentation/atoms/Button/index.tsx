import { HTMLAttributes, HTMLProps, ReactNode } from 'react';

import cs from 'classnames';

import classes from './index.module.scss';

export interface ClassNamesProps {
  button?: string;
  primary?: string;
  secondary?: string;
  tertiary?: string;
  unStyled?: string;
  errored?: string;
}

interface IButtonProps extends HTMLAttributes<HTMLButtonElement | HTMLSpanElement>{
  classNames?: ClassNamesProps;
  variant?:
    | 'primary'
    | 'secondary'
    | 'unStyled'
    | 'tertiary'
    | 'button'
    | 'errored';
  children?: ReactNode;
  onClick?: () => void;
  tag?: keyof Pick<HTMLElementTagNameMap, 'button' | 'span'>;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

const Button = (
  {
    children,
    classNames = {},
    variant = 'primary',
    tag: Tag = 'button',
    disabled,
    type,
    ...props
  }: IButtonProps) => (
  <Tag
    {...props}
    disabled={disabled}
    type={type}
    className={cs(
      classes.button,
      classNames?.button,
      classes[variant],
      classNames?.[variant],
    )}
  >
    {children}
  </Tag>
);

export default Button;
