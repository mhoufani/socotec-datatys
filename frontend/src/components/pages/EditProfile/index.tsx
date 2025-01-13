import Container from "@/components/presentation/atoms/Container";
import Title from '@/components/presentation/atoms/Title';
import ProfileForm, { IFormInput } from '@/components/presentation/organismes/ProfileForm';
import { usePageCtx } from '@/services/pageCtx';
import { useUserService } from '@/services/user';
import { IEditProfilePageProps } from "../../../pages/profiles/[id]"
import { FieldErrors } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from '@/components/presentation/atoms/Button';
import classes from "./index.module.scss";

const EditProfile = () => {
  const router = useRouter();
  const userService = useUserService();
  const { user } = usePageCtx<IEditProfilePageProps>();

  const [errors] = useState<FieldErrors<IFormInput>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (formData: IFormInput) => {
    try {
      setIsLoading(true);
      const { errors } = await userService.updateProfile({ id: user.id, ...formData});
      if(errors) {
        // todo: implement errors messages
      } else {
        await router.push("/profiles");
      }
    } catch(e) {
      // todo: implement errors messages
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true);
      const { errors } = await userService.deleteProfile({ id: user.id });
      if(errors) {
      // todo: implement errors messages
      } else {
        await router.push("/profiles");
      }
    } catch(e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container classNames={{ container: classes.editProfile}}>
      <Title>Edit Profile</Title>
      <Button
        classNames={{ button: classes.deleteButton }}
        variant={"errored"}
        onClick={onDelete}>
        {"Delete Profile"}
      </Button>
      <ProfileForm
        initialState={{
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          city: user.city,
          country: user.country,
          avatar: user.avatar,
          phoneNumber: user.phone_number,
        }}
        errors={errors}
        onSubmit={onSubmit}
        disabled={isLoading}
      />
    </Container>
  );
}

export default EditProfile;
