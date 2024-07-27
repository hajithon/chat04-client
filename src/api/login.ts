import axios from 'axios';

import { api } from '@/api/index';

export const registerUser = (nickname: string, password: string) => {
  api
    .post('/auth/register/pw', null, {
      params: {
        nickname,
        pwd: password,
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.error('error1:', error.message);
      } else {
        console.error('error2:', error);
      }
    });
};
