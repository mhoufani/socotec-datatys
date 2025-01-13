import { ReactNode } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import cs from 'classnames';

import classes from './index.module.scss';

interface ClassnamesProps {
  link?: string;
  disabled?: string;
}

export interface ILinkProps extends NextLinkProps {
  classNames?: ClassnamesProps,
  disabled?: boolean;
  children?: ReactNode;
}

const Link = (
  {
    href = '#',
    disabled,
    classNames,
    children,
  }: ILinkProps) => (
  <NextLink
    href={href}
    className={cs(classes.link, classNames?.link, {
      [classes.disabled]: disabled,
    }, disabled && classNames?.disabled)}
  >
    {children}
  </NextLink>
);

export default Link;
