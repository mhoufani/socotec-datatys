import {
  createContext, ReactNode,
  useContext,
} from 'react';

import api from '@/tools/api';

export interface IUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  city: string;
  country: string;
  phone_number: string;
  avatar: string | null;
}

export interface IQueryCreateProfile {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  phoneNumber: string;
  avatar?: string | null;
}

export const queryCreateProfile = async ({
  firstName,
  lastName,
  email,
  country,
  city,
  phoneNumber,
  avatar,
}: IQueryCreateProfile): Promise<{ data?: {}, errors?: []}> => {
  const formData = new FormData();
  formData.append('firstName', firstName);
  formData.append('lastName', lastName);
  formData.append('email', email);
  formData.append('country', country);
  formData.append('city', city);
  formData.append('phoneNumber', phoneNumber);
  // todo: implement file and mimeType
  // avatar && formData.append('avatar', avatar);

  return api({
    method: 'POST',
    url: '/api/user/create',
    headers: {
      'Content-Type': 'multipart/form-data;',
      Accept: 'multipart/form-data',
    },
    data: formData,
  })
    .then((res) => res.data)
    .catch((e) => {
      console.warn('user.queryCreateUser: ', e);
      return e.response.data;
    });
};

const queryGetProfiles = () => {
  return api({
    url: 'api/users',
    method: 'GET'
  }).then((res) => res.data)
    .catch((e) => {
      console.warn('user.queryGetProfileInfo: ', e);
      return e.response;
    });
}


interface IQueryGetProfileInfo {
  id: string;
}

const queryGetProfileInfo = async ({ id }: IQueryGetProfileInfo) => {
  return api({
    url: `/api/users/${id}`,
    method: 'GET'
  })
    .then((res) => res.data)
    .catch((e) => {
      console.warn('user.queryGetProfileInfo: ', e);
      return e.response;
    });
}


export interface IQueryUpdateProfile extends IQueryCreateProfile {
  id: string;
}

export const queryUpdateProfile = async (
  {
    id,
    firstName,
    lastName,
    email,
    country,
    city,
    phoneNumber,
    avatar,
  }: IQueryUpdateProfile): Promise<{ data?: {}, errors?: string[] }> => {

  const formData = new FormData();
  formData.append('firstName', firstName);
  formData.append('lastName', lastName);
  formData.append('email', email);
  formData.append('country', country);
  formData.append('city', city);
  formData.append('phoneNumber', phoneNumber);
  // todo: implement file and mimeType
  // avatar && formData.append('avatar', avatar);

  return api({
    method: 'PUT',
    url: `/api/users/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data;',
      Accept: 'multipart/form-data',
    },
    data: formData,
  })
    .then((res) => res.data)
    .catch((e) => {
      console.warn('user.queryUpdateProfile: ', e);
      return e.response;
    });
};

interface IQueryDeleteProfile {
  id: string;
}

export const queryDeleteProfile = async ({ id }: IQueryDeleteProfile) => {
  return api({
    method: 'DELETE',
    url: `/api/users/${id}`,
  }).then((res) => res.data)
    .catch((e) => {
      console.warn('user.queryDeleteProfile: ', e);
      return e.response;
    });
};

export interface IUserService {
  createProfile: (data: IQueryCreateProfile) => Promise<{ data?: { id?: string }, errors?: string[]}>;
  getProfiles: () => Promise<{ data?: IUser[], errors?: string[] }>;
  getProfile: (data: IQueryGetProfileInfo) => Promise<{ data?: IUser, errors?: string[] }>;
  updateProfile: (data: IQueryUpdateProfile) => Promise<{ data?: { count?: number }, errors?: string[]}>;
  deleteProfile: (data: IQueryDeleteProfile) => Promise<{ data?: { count?: number }, errors?: string[]}>;
}

const UserService: IUserService = {
  getProfiles: queryGetProfiles,
  createProfile: queryCreateProfile,
  updateProfile: queryUpdateProfile,
  deleteProfile: queryDeleteProfile,
  getProfile: queryGetProfileInfo
}

const UserContext = createContext<IUserService>(UserService);

// this service is the base of user state logged info with backend services
export function UserServiceProvider({ children }: { children: ReactNode }) {
  return (
    <UserContext.Provider
      value={UserService}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserService = (): IUserService => useContext(UserContext);

export default UserService;
