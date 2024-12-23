import React from 'react';

import cs from 'classnames';
import PropTypes from 'prop-types';

import classes from './index.module.scss';

function Button({
  children,
  classNames,
  element: Element,
  variant,
  onClick,
  type,
  disabled,
  ...props
}) {
  return (
    <Element
      {...props}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={cs(
        classes.button,
        classNames.button,
        classes[variant],
        classNames[variant],
      )}
    >
      {children}
    </Element>
  );
}

Button.propTypes = {
  classNames: PropTypes.shape({
    button: PropTypes.string,
    primary: PropTypes.string,
    secondary: PropTypes.string,
    tertiary: PropTypes.string,
    unStyled: PropTypes.string,
  }),
  element: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  type: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'unStyled']),
};

Button.defaultProps = {
  classNames: {},
  children: null,
  disabled: false,
  element: 'button',
  type: 'button',
  variant: 'primary',
  onClick: () => {},
};

export default Button;
