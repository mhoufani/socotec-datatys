import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@/components/presentation/atoms/Button';

import classes from './index.module.scss';

function AvatarUploadField({
  id,
  name,
  onChange,
  picture: _picture,
  placeholder,
}) {
  const [picture, setPicture] = useState(_picture);
  return (
    <div className={classes.pictureUploadButton}>
      <img
        className={classes.img}
        src={picture || 'https://placehold.co/200x200'}
        alt="profile-picture"
      />
      <label className={classes.uploadLabel} htmlFor={id}>
        <input
          accept="image/*"
          id={id}
          name={name}
          type="file"
          onChange={(e) => {
            const fileReader = new FileReader();
            fileReader.onload = () => {
              if (fileReader.readyState === 2) {
                onChange(fileReader.result);
                setPicture(fileReader.result);
              }
            };
            fileReader.readAsDataURL(e.target.files[0]);
          }}
          style={{ display: 'none' }}
        />
        <Button
          classNames={{
            button: classes.iconButton,
          }}
          element="span"
          variant="primary"
          aria-label="upload picture"
        >
          <img
            className={classes.icon}
            src="/svg/photo-camera.svg"
            alt="photo-camera"
          />
        </Button>
      </label>
    </div>
  );
}

AvatarUploadField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

AvatarUploadField.defaultProps = {
  picture: null,
  placeholder: 'https://placehold.co/200x200',
};

export default AvatarUploadField;
