import { ReactNode } from 'react';
import cs from 'classnames';

import classes from './index.module.scss';

export interface ClassnamesProps {
  fieldContainer?: string;
  container?: string
  errorField?: string;
  errorContainer?: string;
}

export interface IFieldProps {
  errorMessage?: ReactNode;
  classNames?: ClassnamesProps;
  children?: ReactNode;
}

const FieldContainer = ({
  children,
  classNames = {},
  errorMessage,
}: IFieldProps) => (
  <div
    className={cs(
      classes.fieldContainer,
      classNames?.fieldContainer,
      !!errorMessage && classes.errorField,
      classNames?.errorField,
    )}
  >
    <div className={cs(classes.container, classNames?.container)}>
      {children}
    </div>
    {errorMessage && (
      <div
        className={cs(classes.errorContainer, classNames?.errorContainer)}
      >
        {errorMessage}
      </div>
    )}
  </div>
);

export default FieldContainer;
