import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { Button } from '@/components/common/Button/Button';
import TextInput from '@/components/common/TextInput';
import { GameInfoPage } from '@/pages/GameInfoPage';
import { GameStartPage } from '@/pages/GameStartPage';
import { currentNickname } from '@/recoil/nickname';

const ParticipantsForm = () => {
  const { roomId: paramRoomId } = useParams();
  const [nickname, setNickname] = useRecoilState(currentNickname);
  const [roomId, setRoomId] = useState<string>('');
  const [step, setStep] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (paramRoomId) {
      setRoomId(paramRoomId);
    }
  }, [paramRoomId]);

  useEffect(() => {
    if (step === 1) {
      const timer = setTimeout(() => setStep(2), 1500);
      return () => clearTimeout(timer);
    } else if (step === 2) {
      const timer = setTimeout(() => navigate(`/${roomId}`), 3500);
      return () => clearTimeout(timer);
    }
  }, [step, navigate, roomId]);

  const handleCreateRoom = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStep(1);
  };

  const isSubmitDisabled = !nickname || !roomId;

  if (step === 0) {
    return (
      <Container>
        <Title>참여하기</Title>
        <form onSubmit={handleCreateRoom}>
          <div>
            <Label>별명</Label>
            <br />
            <br />
            <TextInput
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="사용할 별명을 입력해주세요"
            />
          </div>
          <div>
            <Label>참여 코드 입력:</Label>
            <br />
            <br />
            <TextInput
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="참여 코드를 입력하세요"
            />
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <Button type="submit" variant="fill" disabled={isSubmitDisabled}>
            채팅방 입장하기
          </Button>
        </form>
      </Container>
    );
  }

  if (step === 1) {
    return (
      <div>
        <GameStartPage />
      </div>
    );
  }

  if (step === 2) {
    return (
      <div>
        <GameInfoPage />
      </div>
    );
  }

  return null;
};

export default ParticipantsForm;

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
