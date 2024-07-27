import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as Graphic } from '@/assets/logos/graphic.svg';
import { Button } from '@/components/common/Button/Button';

const ParticipantsForm = () => {
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    navigate('/roomCreate');
  };

  const handleJoinRoom = () => {
    navigate(`/ParticipantsJoin/:roomId`);
  };

  return (
    <Container>
      <Title>
        예측불가 릴레이 소설
        <br />
        <br />
        <br />
        함께 작성해보아요!
      </Title>
      <Graphic />

      <br />
      <br />
      <br />
      <br />
      <br />
      <Button variant="fill" onClick={handleCreateRoom}>
        방만들기
      </Button>
      <br />
      <Button variant="stroke" onClick={handleJoinRoom}>
        참여하기
      </Button>
    </Container>
  );
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
