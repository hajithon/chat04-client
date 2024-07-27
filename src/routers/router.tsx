import { Route, Routes } from 'react-router-dom';

import { ChatRoomCreatePage } from '@/pages/ChatRoomCreatePage';
import { ChatRoomJoinPage } from '@/pages/ChatRoomJoinPage';
import { ChatRoomPage } from '@/pages/ChatRoomPage';
import { ParticipantsJoinPage } from '@/pages/ParticipantsJoinPage';
import { StartPage } from '@/pages/StartPage';
import { WaitRoomJoin } from '@/pages/WaitRoomJoin';

export const Router = () => {
  return (
    <Routes>
      <Route path="/roomCreate" element={<ChatRoomCreatePage />} />
      <Route path="/WaitRoomJoin" element={<WaitRoomJoin />} />
      <Route path="/" element={<StartPage />} />
      <Route path="/:roomId" element={<ChatRoomPage />} />
      <Route path="/ChatRoomJoin" element={<ChatRoomJoinPage />} />
      <Route path="/ParticipantsJoin/:roomId" element={<ParticipantsJoinPage />} />
    </Routes>
  );
};
