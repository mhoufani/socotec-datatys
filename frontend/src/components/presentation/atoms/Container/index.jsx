import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import classes from './index.module.scss';

function Container({
  children,
  className,
  element: Element,
  ...props
}) {
  return (
    <Element
      className={cs(classes.container, className)}
      {...props}
    >
      {children}
    </Element>
  );
}

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  element: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

Container.defaultProps = {
  children: null,
  className: null,
  element: 'div',
};

export default Container;
