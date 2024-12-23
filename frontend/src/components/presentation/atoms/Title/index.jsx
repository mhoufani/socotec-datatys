import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { isNumber } from '@/tools/checkers';

import classes from './index.module.scss';

const DEFAULT_LEVEL = 1;
export const LEVELS_NUMBERS = [1, 2, 3, 4, 5, 6];

export const LEVELS = [
  ...LEVELS_NUMBERS,
  ...LEVELS_NUMBERS.map((l) => `H${l}`),
];

function Title({
  center,
  children,
  className,
  content,
  element: Element,
  level: _level,
  secondary,
  ...props
}) {
  const level = isNumber(_level)
    ? _level
    : `${_level}`.replace('H', '');
  const levelKey = `titleH${level || DEFAULT_LEVEL}`;
  const TitleComponent = Element || `h${level || DEFAULT_LEVEL}`;
  const classNames = [
    classes.title,
    className,
    classes[levelKey],
    center && classes.center,
  ];

  return (
    <TitleComponent className={cs(...classNames)} {...props}>
      {children || content}
    </TitleComponent>
  );
}

Title.propTypes = {
  center: PropTypes.bool,
  children: PropTypes.node,
  content: PropTypes.string,
  className: PropTypes.string,
  element: PropTypes.string,
  level: PropTypes.oneOf(LEVELS),
  secondary: PropTypes.node,
};

Title.defaultProps = {
  level: DEFAULT_LEVEL,
  className: {},
  center: false,
  children: null,
  content: null,
  element: null,
  secondary: null,
};

export default Title;
