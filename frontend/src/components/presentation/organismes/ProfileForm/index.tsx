import { useForm, Controller, FieldErrors } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"

import TextField from '@/components/presentation/molecules/TextField';
import AvatarField from 'components/presentation/molecules/AvatarField';
import Button from '@/components/presentation/atoms/Button';

import classes from './index.module.scss';

// todo: move to default config props
const schema = yup.object({
  firstName: yup.string()
    .required('Your first name is required'),
  lastName: yup.string()
    .required('Your last name is required'),
  country: yup.string()
    .required('Your country is required'),
  city: yup.string()
    .required('your city is required'),
  email: yup
    .string()
    .email('your email is not valid')
    .required('your email is required'),
  phoneNumber: yup.string()
    .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Phone number is not valid')
    .required('your Phone number is required'),
  avatar: yup.string().nullable(),
});

export interface IFormInput {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  city: string
  country: string,
  avatar?: string | null
}

export interface IProfileFormProps {
  initialState?: Partial<IFormInput>
  onSubmit?: (data: IFormInput) => void
  errors?: FieldErrors<IFormInput>
  disabled?: boolean;
}

function ProfileForm(
  {
    initialState,
    onSubmit = () => {},
    errors: _errors,
    disabled = false,
  }: IProfileFormProps) {

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: initialState?.firstName || '',
      lastName: initialState?.lastName || '',
      email: initialState?.email || '',
      phoneNumber: initialState?.phoneNumber || '',
      city: initialState?.city || '',
      country: initialState?.country || '',
      avatar: initialState?.avatar || null,
    },
    resolver: yupResolver(schema),
    errors: _errors,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.form}>
        <div className={classes.formSectionLeft}>
          <Controller
            name={'firstName'}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (<TextField
              id={'firstname'}
              labelMessage="First name"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              isErrored={!!errors.firstName}
              errorMessage={errors?.firstName?.message}
              classNames={{
                textField: classes.textField,
              }}
            />)}
          />
          <Controller
            name={'lastName'}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                id="lastName"
                name="lastName"
                labelMessage="Last name"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                isErrored={!!errors.lastName}
                errorMessage={errors?.lastName?.message}
                classNames={{
                  textField: classes.textField,
                }}
              />
            )}
          />
          <Controller
            name={'country'}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                id="country"
                name="country"
                labelMessage="Country"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                isErrored={!!errors.country}
                errorMessage={errors?.country?.message}
                classNames={{
                  textField: classes.textField,
                }}
              />
            )}
          />
          <Controller
            control={control}
            name={'city'}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                id="city"
                name="city"
                labelMessage="City"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                isErrored={!!errors.city}
                errorMessage={errors?.city?.message}
                classNames={{
                  textField: classes.textField,
                }}
              />
            )} />
          <Controller
            name={'phoneNumber'}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                id="phoneNumber"
                name="phoneNumber"
                labelMessage="Phone number"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                isErrored={!!errors.phoneNumber}
                errorMessage={errors?.phoneNumber?.message}
                classNames={{
                  textField: classes.textField,
                }}
              />
            )}
          />
          <Controller
            control={control}
            name={'email'}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                id="email"
                name="email"
                labelMessage="Email address"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                isErrored={!!errors.email}
                errorMessage={errors?.email?.message}
                classNames={{
                  textField: classes.textField,
                }}
              />
            )}
          />
        </div>
        <div className={classes.formSectionRight}>
          <Controller
            control={control}
            name={'avatar'}
            render={({ field: { onChange, value } }) => (
              <AvatarField
                id="avatar"
                name="avatar"
                onChange={onChange}
                picture={value}
                errorMessage={errors?.avatar?.message}
              />
            )} />
        </div>
        <Button
          classNames={{ button: classes.buttonSubmit }}
          disabled={disabled}
          variant="primary"
          type="submit"
        >
          Save your profile
        </Button>
      </div>
    </form>
  );
}

export default ProfileForm;
