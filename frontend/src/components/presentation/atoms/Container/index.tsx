import cs from 'classnames';

import classes from './index.module.scss';
import { ReactNode } from 'react';

interface ClassNamesProps {
  container?: string | string[]
}

export interface IContainerProps {
  element?: HTMLElement;
  classNames?: ClassNamesProps
  tag?: keyof Pick<HTMLElementTagNameMap, 'div' | 'section'>;
  children?: ReactNode;
}

const Container =
  ({
     classNames,
     tag: Tag = 'div',
     children,
     ...props
   }: IContainerProps) => (
    <Tag
      className={cs(classes.container, classNames?.container)}
      {...props}
    >
      {children}
    </Tag>
  );

export default Container;
