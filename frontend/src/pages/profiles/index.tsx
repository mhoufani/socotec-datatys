import withPageCtx from "@/services/pageCtx";
import Profiles from "@/components/pages/Profiles";
import UserService, { IUser } from "@/services/user";

export interface IProfilesPageProps {
  users: IUser[]
}

function ProfilesPage() {
  return (<Profiles />);
}

export async function getServerSideProps() {
  const res = await UserService.getProfiles();
  return {
    props: {
      users: res.data || []
    },
  }
}



export default withPageCtx(ProfilesPage);
