import React from 'react';

import Link from '@/components/presentation/atoms/Link';
import Title from '@/components/presentation/atoms/Title';
import Container from '@/components/presentation/atoms/Container';

import classes from './index.module.scss';

function Home() {
  return (
    <Container className={classes.home}>
      <Title level={1}>
        Welcome to Datatys registration test
      </Title>
      <Link
        href="/profile/register"
        classNames={{ link: classes.link }}
      >
        start Profile registration
      </Link>
    </Container>
  );
}

export default Home;
