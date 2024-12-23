import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import classes from './index.module.scss';

function Input({
  classNames,
  isErrored,
  ...props
}) {
  return (
    <input
      {...props}
      className={cs(classes.input, classNames.input, {
        [cs(classes.isErrored, classNames.isErrored)]: isErrored,
      })}
    />
  );
}

Input.defaultProps = {
  classNames: {},
  isErrored: false,
};

Input.propTypes = {
  classNames: PropTypes.shape({
    isErrored: PropTypes.string,
    input: PropTypes.string,
  }),
  isErrored: PropTypes.bool,
};

export default Input;
