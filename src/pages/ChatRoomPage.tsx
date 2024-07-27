import React from 'react';

import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import ChatRoom from '@/components/ChatRoom';
import { currentNickname } from '@/recoil/nickname';

export const ChatRoomPage = () => {
  const { roomId } = useParams<{ roomId: string }>();

  const hardRoomId = roomId || 'c0486097-54ce-4480-b077-d7203afd3122';
  const nickname = useRecoilValue(currentNickname);
  console.log('현재 닉네임 확인용:', nickname);
  return (
    <div>
      <h1>Chat Room: {hardRoomId}</h1>
      <ChatRoom roomId={hardRoomId} username={nickname} />
    </div>
  );
};
