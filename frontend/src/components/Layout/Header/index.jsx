import React from 'react';
import PropTypes from 'prop-types';

import classes from './index.module.scss';

function Header({ children }) {
  return (
    <header className={classes.header}>
      <img className={classes.logo} src="/logo.png" alt="logo SOCOTEC"/>
      {children}
    </header>
  );
}

Header.propTypes = {
  children: PropTypes.node,
};

Header.defaultProps = {
  children: null,
};

export default Header;
