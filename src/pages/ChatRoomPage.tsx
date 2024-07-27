import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import ChatRoom from '@/components/Chat/ChatRoom';
import ChatTitle from '@/components/Chat/ChatTitle';
import { currentNickname } from '@/recoil/nickname';

export const ChatRoomPage = () => {
  const { roomId } = useParams<{ roomId: string }>();

  const hardRoomId = roomId || '';
  const nickname = useRecoilValue(currentNickname);
  console.log('현재 닉네임 확인용:', nickname);
  return (
    <Container>
      <ChatTitle />
      <ChatRoom roomId={hardRoomId} username={nickname} />
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  //padding: 16px;
  background: ${({ theme }) => theme.colors.gray80};
`;
