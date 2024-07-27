import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { createRoom } from '@/api/create';
import { Button } from '@/components/common/Button/Button';
import TextInput from '@/components/common/TextInput';
import { currentNickname } from '@/recoil/nickname';

const ChatRoomCreate = () => {
  const [nickname, setNickname] = useRecoilState(currentNickname);
  const [roomName, setRoomName] = useState<string>('');
  const [maxUserCnt, setMaxUserCnt] = useState<number>(3);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCreateRoom = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const roomId = await createRoom(roomName, nickname, maxUserCnt);
      navigate(`/${roomId}`);
    } catch (error) {
      setError('채팅방 생성에 실패했습니다.');
    }
  };

  return (
    <Container>
      <Title>방 만들기</Title>
      <form onSubmit={handleCreateRoom}>
        <div>
          <Label>별명</Label>
          <br />
          <br />
          <TextInput
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="사용할 별명을 입력해주세요"
          />
        </div>
        <div>
          <Label>방 이름</Label>
          <br />
          <br />
          <TextInput
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="방 이름을 입력해주세요"
          />
        </div>
        <div>
          <Label>참여자 수</Label>
          <br />
          <br />
          <TextInput
            value={maxUserCnt}
            onChange={(e) => setMaxUserCnt(Number(e.target.value))}
            placeholder="몇 명이 참여하나요?"
          />
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Button type="submit">채팅방 생성</Button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </Container>
  );
};

export default ChatRoomCreate;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  min-height: 100vh;
`;

const Title = styled.div`
  ${({ theme }) => theme.fonts.headline1};
  padding-top: 80px;
  padding-bottom: 50px;
`;

const Label = styled.label`
  ${({ theme }) => theme.fonts.body11};
  color: ${({ theme }) => theme.colors.gray80};
`;
