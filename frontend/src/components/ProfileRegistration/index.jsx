import React, { useState, useCallback } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import 'yup-phone';

import Container from '@/components/presentation/atoms/Container';
import Title from '@/components/presentation/atoms/Title';
import TextField from '@/components/presentation/molecules/TextField';
import Button from '@/components/presentation/atoms/Button';
import PictureUploadButton from '@/components/presentation/molecules/AvatarUploadField';

import { useUserService } from '@/services/user';

import ProfileSuccessUpload from './ProfileSuccessUpload';

import classes from './index.module.scss';

const validationSchema = yup.object({
  firstName: yup.string()
    .required('Your first name is required'),
  lastName: yup.string()
    .required('Your last name is required'),
  country: yup.string()
    .required('Your country is required'),
  city: yup.string()
    .required('your city is required'),
  email: yup
    .string('Enter your email')
    .email('your email is not valid')
    .required('your email is required'),
  phoneNumber: yup.string()
    .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Phone number is not valid')
    .required('your Phone number is required'),
});

function ProfileRegistration() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessRegistered, setIsSuccessRegistered] = useState(false);

  const userService = useUserService();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      country: '',
      city: '',
      email: '',
      phoneNumber: '',
      avatar: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      const res = await userService.register(values);
      setIsLoading(false);
      if (res.data.errors) {
        const errors = {};
        if (res.data.errors.includes('EMAIL_ALREADY_EXIST')) {
          errors.email = 'this email is already taken';
        }
        formik.setErrors(errors);
      } else {
        setIsSuccessRegistered(true);
      }
    },
  });

  const handleFormReset = useCallback(() => {
    formik.resetForm();
    setIsSuccessRegistered(false);
  }, [formik]);

  return (
    <Container className={classes.profileRegistration}>
      <Container>
        <Title level={1} className={classes.title}>Profile registration</Title>
      </Container>
      {!isSuccessRegistered && (
        <form onSubmit={formik.handleSubmit}>
          <Container className={classes.form}>
            <Container className={classes.formSectionLeft}>
              <TextField
                id="firstName"
                name="firstName"
                labelMessage="First name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                isErrored={formik.touched.firstName && Boolean(formik.errors.firstName)}
                errorMessage={formik.touched.firstName && formik.errors.firstName}
                classNames={{
                  textField: classes.textField,
                }}
              />
              <TextField
                id="lastName"
                name="lastName"
                labelMessage="Last name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                isErrored={formik.touched.lastName && Boolean(formik.errors.lastName)}
                errorMessage={formik.touched.lastName && formik.errors.lastName}
                classNames={{
                  textField: classes.textField,
                }}
              />
              <TextField
                id="country"
                name="country"
                labelMessage="Country"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.country}
                isErrored={formik.touched.country && Boolean(formik.errors.country)}
                errorMessage={formik.touched.country && formik.errors.country}
                classNames={{
                  textField: classes.textField,
                }}
              />
              <TextField
                id="city"
                name="city"
                labelMessage="City"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                isErrored={formik.touched.city && Boolean(formik.errors.city)}
                errorMessage={formik.touched.city && formik.errors.city}
                classNames={{
                  textField: classes.textField,
                }}
              />
              <TextField
                id="phoneNumber"
                name="phoneNumber"
                labelMessage="Phone number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
                isErrored={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                errorMessage={formik.touched.phoneNumber && formik.errors.phoneNumber}
                classNames={{
                  textField: classes.textField,
                }}
              />
              <TextField
                id="email"
                name="email"
                labelMessage="Email address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                isErrored={formik.touched.email && Boolean(formik.errors.email)}
                errorMessage={formik.touched.email && formik.errors.email}
                classNames={{
                  textField: classes.textField,
                }}
              />
            </Container>
            <Container className={classes.formSectionRight}>
              <PictureUploadButton
                id="avatar"
                name="avatar"
                onChange={(data) => formik.setFieldValue('avatar', data)}
                filePicture={formik.values.avatar}
                errorMessage={formik.errors.avatar}
              />
            </Container>
            <Button
              classNames={{ button: classes.buttonSubmit }}
              disabled={isLoading || !formik.isValid}
              variant="primary"
              type="submit"
            >
              Save your profile
            </Button>
          </Container>
        </form>
      )}
      {isSuccessRegistered
        && (
          <ProfileSuccessUpload onClick={handleFormReset} />
        )}
    </Container>
  );
}

export default ProfileRegistration;
