import React from 'react';
import PropTypes from 'prop-types';

import Field from '@/components/presentation/atoms/Field';
import Input from "@/components/presentation/atoms/Input";
import Label from '@/components/presentation/atoms/Label';

function TextField({
  id,
  isErrored,
  errorMessage,
  labelMessage,
  classNames,
  ...props
}) {
  return (
    <Field
      classNames={{ field: classNames.textField }}
      error={errorMessage}
    >
      {labelMessage
        && (
          <Label
            htmlFor={id}
          >
            {labelMessage}
          </Label>
        )}
      <Input
        id={id}
        {...props}
        isErrored={isErrored}
        type="text"
      />
    </Field>

  );
}

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  labelMessage: PropTypes.string,
  isErrored: PropTypes.bool,
  classNames: PropTypes.shape({
    textField: PropTypes.string,
  }),
};

TextField.defaultProps = {
  isErrored: false,
  errorMessage: null,
  labelMessage: null,
  classNames: {},
};

export default TextField;
