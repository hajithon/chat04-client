import { Route, Routes } from 'react-router-dom';

import { ChatRoomCreatePage } from '@/pages/ChatRoomCreatePage';
import { ChatRoomJoinPage } from '@/pages/ChatRoomJoinPage';
import { ChatRoomPage } from '@/pages/ChatRoomPage';
import { ComponentTestPage } from '@/pages/ComponentTestPage';
import { ParticipantsJoinPage } from '@/pages/ParticipantsJoinPage';

export const Router = () => {
  return (
    <Routes>
      <Route path="/page1" element={<ChatRoomCreatePage />} />
      <Route path="/component" element={<ComponentTestPage />} />
      <Route path="/:roomId" element={<ChatRoomPage />} />
      <Route path="/ChatRoomJoin" element={<ChatRoomJoinPage />} />
      <Route path="/ParticipantsJoin/:roomId" element={<ParticipantsJoinPage />} />
    </Routes>
  );
};
