import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import classes from './index.module.scss';

function Label({
  classNames,
  htmlFor,
  children,
  ...props
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cs(classes.label, classNames.label)}
      {...props}
    >
      {children}
    </label>
  );
}

Label.propTypes = {
  classNames: PropTypes.shape({
    label: PropTypes.string,
  }),
  children: PropTypes.node,
  htmlFor: PropTypes.string,
};

Label.defaultProps = {
  classNames: {},
  children: null,
  htmlFor: '',
};

export default Label;
