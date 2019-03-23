import { client } from '../client';

export const fetchProfile = async (token: string) => {
  return client({ endpoint: '/user', token });
};
