import { useState } from "react";
import { useUserService } from '@/services/user';
import Container from "@/components/presentation/atoms/Container";
import Title from '@/components/presentation/atoms/Title';
import ProfileForm, { IFormInput } from "@/components/presentation/organismes/ProfileForm";
import { FieldErrors } from 'react-hook-form';
import { apiErrorEnum } from '@/config/index';
import { useRouter } from 'next/router';

const CreateProfile = () => {
  const userService = useUserService();
  const router = useRouter();
  const [errors, setErrors] = useState<FieldErrors<IFormInput>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (formData: IFormInput) => {
    try{
      setIsLoading(true);
      const { errors } = await userService.createProfile(formData);
      // todo: externalize api errors check 
      if(errors) {
        const formErrors = errors.reduce(
          (errFormatted, err) => {
            if (err === apiErrorEnum.EMAIL_ALREADY_EXIST) {
              errFormatted.email = { type: 'manual', message: 'email already exists' };
            }
            return errFormatted;
          }, {} as FieldErrors<IFormInput>);
        setErrors(formErrors);
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
    <Container>
      <Title>Create Profile</Title>
      <ProfileForm
        onSubmit={onSubmit}
        errors={errors}
        disabled={isLoading}
      />
    </Container>
  );
}

export default CreateProfile;
