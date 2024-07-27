import { atom } from 'recoil';

export const currentNickname = atom<string>({
  key: 'nickname',
  default: ' ',
});
