import React, {
  createContext,
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import api from '../../tools/api';

export const queryRegister = ({
  firstName,
  lastName,
  email,
  country,
  city,
  phoneNumber,
  avatar,
}) => {
  const formData = new FormData();
  formData.append('firstName', firstName);
  formData.append('lastName', lastName);
  formData.append('email', email);
  formData.append('country', country);
  formData.append('city', city);
  formData.append('phoneNumber', phoneNumber);
  formData.append('avatar', avatar);

  return api({
    method: 'POST',
    url: '/api/user/register',
    headers: {
      'Content-Type': 'multipart/form-data;',
      Accept: 'multipart/form-data',
    },
    data: formData,
  })
    .then((res) => res)
    .catch((e) => {
      console.warn('user.queryRegister: ', e);
      return e.response;
    });
};

const UserContext = createContext();

// this service is the base of user state logged info with backend services
export function UserServiceProvider({ children }) {
  return (
    <UserContext.Provider value={{ register: queryRegister }}>
      {children}
    </UserContext.Provider>
  );
}

UserServiceProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUserService = () => useContext(UserContext);
