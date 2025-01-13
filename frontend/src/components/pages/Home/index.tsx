import Link from '@/components/presentation/atoms/Link';
import Title from '@/components/presentation/atoms/Title';
import Container from '@/components/presentation/atoms/Container';

import classes from './index.module.scss';

function Home() {
  return (
    <Container classNames={{ container: classes.home }}>
      <Title>
        {'Welcome to Datatys registration test'}
      </Title>
      <div className={classes.navigation}>
        <Link
          href="/profiles"
          classNames={{ link: classes.link }}
        >
          See Profiles
        </Link>
        <Link
          href="/profiles/create"
          classNames={{ link: classes.link }}
        >
          Create Profile
        </Link>
      </div>
    </Container>
  );
}

export default Home;
