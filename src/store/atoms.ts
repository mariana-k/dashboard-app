import { atom } from 'recoil';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});

export const profileImageState = atom<string>({
  key: 'profileImageState',
  default: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
});
