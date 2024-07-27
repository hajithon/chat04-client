import axios from 'axios';

import { api } from '@/api/index';

export const createRoom = async (
  roomName: string,
  nickname: string,
  maxUserCnt: number
): Promise<string> => {
  try {
    const response = await api.post('/chatrooms/create', null, {
      params: {
        roomName,
        nickname,
        maxUserCnt,
      },
    });
    return response.data.id; // 방 ID 반환
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('error1:', error.message);
    } else {
      console.error('error2:', error);
    }
    throw new Error('채팅방 생성에 실패했습니다.');
  }
};
