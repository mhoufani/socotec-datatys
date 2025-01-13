import '../theme/theme-datatys.scss';
import { UserServiceProvider } from '../services/user';
import Layout from '@/components/Layout';

function CodingTestDatatysApp({
  Component,
  pageProps
}) {
  return (
    <UserServiceProvider>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </UserServiceProvider>
  );
}


export default CodingTestDatatysApp;
