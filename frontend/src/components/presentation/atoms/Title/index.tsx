import cs from 'classnames';

import classes from './index.module.scss';
import { ReactNode } from 'react';

const DEFAULT_LEVEL = 1;

interface ClassnamesProps {

}

export interface ITitleProps {
  center?: boolean;
  classNames?: ClassnamesProps;
  level?: 1 | 2 | 3 | 5 | 6;
  children?: ReactNode;
}

const Title = ({
  center = false,
  children,
  classNames = {},
  level: _level = 1,
  ...props
}: ITitleProps) => {
  const variant = `titleH${_level || DEFAULT_LEVEL}`;
  const Tag = `h${_level || DEFAULT_LEVEL}` as keyof HTMLElementTagNameMap;

  return (
    <Tag
      className={cs(
        classes.title,
        classes[variant],
        center && classes.center,
        classNames
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default Title;
