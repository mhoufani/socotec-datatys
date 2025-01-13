import { Fragment } from 'react';
import Title from '../../presentation/atoms/Title';
import Container from '../../presentation/atoms/Container';
import { usePageCtx } from '@/services/pageCtx';
import { IProfilesPageProps } from '../../../pages/profiles';
import Button from '@/components/presentation/atoms/Button';
import { useRouter } from 'next/router';

import classes from "./index.module.scss";
import Link from '@/components/presentation/atoms/Link';

function Profiles(){
  const router = useRouter();
  const { users } = usePageCtx<IProfilesPageProps>();
  return (
    <Container classNames={{ container: classes.profiles }}>
      <Title>{'Profiles'}</Title>
      <Link classNames={{ link: classes.createProfileLink }} href={"/profiles/create"}>{"Create profile"}</Link>
      <div className={classes.grid}>
          <span>{'Avatar'}</span>
          <span>{'Email'}</span>
          <span>{'First name'}</span>
          <span>{'Last name'}</span>
          <span>{'City'}</span>
          <span>{'Country'}</span>
          <span/>
        {users.map(
          ({ id, email, first_name, last_name, city, country, avatar }) => {
            return (
              <Fragment key={id}>
                <span>
                  <img className={classes.avatarItem} src={avatar || "https://placehold.co/200x200"} alt="avatar" />
                </span>
                <span>{email || 'unknown'}</span>
                <span>{first_name || 'unknown'}</span>
                <span>{last_name || 'unknown'}</span>
                <span>{city || 'unknown'}</span>
                <span>{country || 'unknown'}</span>
                <span>
                  <Button
                    classNames={{ button: classes.editItem }}
                    variant={'primary'}
                    onClick={() => router.push(`/profiles/${id}`)}>
                    {'edit'}
                  </Button>
                </span>
              </Fragment>);
          })}
      </div>
    </Container>
  );
}

export default Profiles;
