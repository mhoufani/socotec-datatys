import React from 'react';
import PropTypes from 'prop-types';
import '../theme/theme-datatys.scss';

import { UserServiceProvider } from '../services/user';
import Layout from '../components/Layout';

function CodingTestDatatysApp({ Component, pageProps }) {
  return (
    <UserServiceProvider>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </UserServiceProvider>
  );
}

CodingTestDatatysApp.propTypes = {
  Component: PropTypes.node.isRequired,
  pageProps: PropTypes.shape({}).isRequired,
};

export default CodingTestDatatysApp;
