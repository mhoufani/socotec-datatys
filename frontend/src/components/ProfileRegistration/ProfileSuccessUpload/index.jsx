import React from 'react';
import PropTypes from 'prop-types';

import Container from "@/components/presentation/atoms/Container";
import Title from "@/components/presentation/atoms/Title";
import Link from "@/components/presentation/atoms/Link";
import Button from "@/components/presentation/atoms/Button";

import classes from "./index.module.scss";

function ProfileSuccessUpload({ onClick }) {
  return (
    <Container className={classes.profileSuccessUpload}>
      <Title level={5}>You profile have been created with success</Title>
      <Button
        classNames={{ button: classes.button }}
        onClick={onClick}
      >
        Register an other profile
      </Button>
      <Link href="/">Return at home</Link>
    </Container>
  );
}

ProfileSuccessUpload.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ProfileSuccessUpload;
