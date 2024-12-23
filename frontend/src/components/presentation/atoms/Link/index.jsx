import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';

import cs from 'classnames';

import classes from './index.module.scss';

function Link({
  children,
  href,
  text,
  disabled,
  classNames,
  ...props
}) {
  return (
    <NextLink
      href={href}
      className={cs(classes.link, classNames.link, {
        [classes.disabled]: disabled,
        [classNames.disabled]: disabled,
      })}
      {...props}
    >
      {children || text}
    </NextLink>
  );
}

Link.propTypes = {
  classNames: PropTypes.shape({
    link: PropTypes.string,
    disabled: PropTypes.string,
  }),
  href: PropTypes.string,
  text: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

Link.defaultProps = {
  classNames: {},
  href: '#',
  text: 'label',
  children: null,
  disabled: false,
};

export default Link;
