import { ReactNode } from 'react';
import Link from '@/components/presentation/atoms/Link';

import classes from './index.module.scss';

import Header from './Header';

function Layout({ children }: { children: ReactNode }) {
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

export default Layout;
