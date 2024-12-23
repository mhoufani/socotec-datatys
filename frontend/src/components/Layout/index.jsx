import React from 'react';
import PropTypes from 'prop-types';

import Link from '@/components/presentation/atoms/Link';

import classes from './index.module.scss';

import Header from './Header';

function Layout({ children }) {
  return (
    <main className={classes.layout}>
      <Header>
        <Link
          href="/"
          classNames={{ link: classes.headerTitle }}
        >
          Datatys Monitoring
        </Link>
      </Header>
      {children}
    </main>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
