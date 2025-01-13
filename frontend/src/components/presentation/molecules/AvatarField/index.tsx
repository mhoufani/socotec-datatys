import { ChangeEvent, ReactNode, useState } from 'react';

import Button from '@/components/presentation/atoms/Button';

import classes from './index.module.scss';

export interface IAvatarFieldProps {
  id: string;
  name: string;
  onChange?: (value: string) => void;
  picture?: string | null;
  placeholder?: string;
  errorMessage?: ReactNode;
}

const AvatarField = (
  {
    id,
    name,
    onChange = () => {},
    picture: _picture,
    placeholder = 'https://placehold.co/200x200',
  }: IAvatarFieldProps) => {
  const [picture, setPicture] = useState(_picture);
  return (
    <div className={classes.pictureUploadButton}>
      <img
        className={classes.img}
        src={picture || placeholder}
        alt="profile-picture"
      />
      <label className={classes.uploadLabel} htmlFor={id}>
        <input
          id={id}
          accept="image/*"
          name={name}
          type="file"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const fileReader = new FileReader();
            fileReader.onload = () => {
              if (fileReader.readyState === 2) {
                const result = fileReader.result as string;
                onChange(result);
                setPicture(result);
              }
            };
            e.target.files?.[0] && fileReader.readAsDataURL(e.target.files?.[0]);
          }}
          style={{ display: 'none' }}
        />
        <Button
          classNames={{
            button: classes.iconButton,
          }}
          tag="span"
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
};

export default AvatarField;
