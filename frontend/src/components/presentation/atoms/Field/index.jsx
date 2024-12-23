import React from 'react';

import cs from 'classnames';
import PropTypes from 'prop-types';

import classes from './index.module.scss';

const Field = ({
  children,
  classNames,
  error,
}) => (
  <div
    className={cs(
      classes.field,
      error && classes.errorField,
      classNames.field,
    )}
  >
    <div className={cs(classes.container, classNames.container)}>
      {children}
    </div>
    {error && (
      <div
        className={cs(classes.error, classNames.error)}
      >
        {error}
      </div>
    )}
  </div>
);

Field.propTypes = {
  children: PropTypes.node,
  error: PropTypes.string,
  classNames: PropTypes.shape({
    field: PropTypes.string,
    container: PropTypes.string,
    error: PropTypes.string,
    label: PropTypes.string,
  }),
  labelProps: PropTypes.shape({
    htmlFor: PropTypes.string,
    text: PropTypes.string,
  }),
};

Field.defaultProps = {
  classNames: {},
  children: '',
  error: null,
  labelProps: {},
};

export default Field;
