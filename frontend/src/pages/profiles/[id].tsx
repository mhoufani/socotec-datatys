import { GetServerSideProps } from 'next'
import withPageCtx from "@/services/pageCtx";
import EditProfile from "@/components/pages/EditProfile";
import UserService, { IUser } from '@/services/user';

export interface IEditProfilePageProps {
  user: IUser;
}

const EditProfilePage = () => {
 return (<EditProfile/>)
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as { id: string };
  const { data } = await UserService.getProfile({ id });

  // todo: catch errors and redirection
  return {
    props: { user: data || null },
  };
};

export default withPageCtx(EditProfilePage);
