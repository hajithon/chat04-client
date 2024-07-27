import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '@/api/axiosInstance';
import styled from 'styled-components';

// 전체 레이아웃 스타일링
const Container = styled.div`
  position: relative;
  height: 920px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  box-sizing: border-box;
`;

// HeaderMessage 스타일 컴포넌트
const HeaderMessage = styled.div`
  width: 375px;
  height: 218px;
  padding: 62px 86px 32px 20px;
  background-color: #546aef;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-family: 'NanumSquare Neo OTF', sans-serif;
  font-size: 24px;
  font-weight: 800;
  line-height: 36px;
  text-align: left;
`;

// 스크롤 영역 스타일 컴포넌트
const ScrollArea = styled.div`
  width: calc(100% - 40px); /* 부모 컨테이너의 패딩을 고려 */
  margin-top: 10px; /* 상단 여백 추가 */
  overflow-y: hidden;
  overflow-x: hidden; /* 가로 스크롤 숨기기 */
  padding: 0 20px;

  h4 {
    display: flex;
    justify-content: space-between; /* 양쪽 정렬 */
    align-items: center;
    width: 100%;
    margin: 10px; /* 기본 마진 제거 */
    padding: 0 10px; /* 좌우 패딩 추가 */
  }
`;

// 스타일 컴포넌트
const StyledBox = styled.div<{ isHost: boolean }>`
  width: 107px;
  height: 137px;
  background-color: ${(props) => (props.isHost ? '#EEF1FE' : '#ffffff')};
  border: 1px solid #dde1e8;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const AvatarContainer = styled.div<{ hasParticipant: boolean }>`
  width: 65px;
  height: 65px;
  background-color: ${(props) => (props.hasParticipant ? 'gray' : 'lightgray')};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

const StyledName = styled.div`
  width: 76px;
  height: 24px;
  font-family: 'SUIT Variable';
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #121212;
  margin-top: 8px;
`;

const StyledButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  height: 56px;
  margin: 20px;
  padding: 16px 18px;

  border: none;
  background-color: ${(props) => (props.disabled ? '#d3d3d3' : '#546aef')};
  color: ${(props) => (props.disabled ? '#a9a9a9' : 'white')};
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const Button_S = styled.button`
  width: 200px;
  height: 40px;
  padding: 5px 10px;
  border-radius: 20px;
  border: 1px solid #546aef;
  background-color: transparent;
  color: #546aef;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    display: flex;
    align-items: center;
  }

  .icon {
    margin-right: 8px;
    font-size: 16px;
  }

  .text {
    font-size: 14px;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

// 모달 컴포넌트
const Modal: React.FC<{ message: string; onConfirm: () => void; onCancel: () => void }> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <p>{message}</p>
        <button onClick={onCancel}>돌아가기</button>
        <button onClick={onConfirm}>나가기</button>
      </ModalContent>
    </ModalOverlay>
  );
};

const WaitRoomJoinForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { roomName, nickName, maxUserCnt, hostId } = location.state as {
    roomName: string;
    nickName: string;
    maxUserCnt: number;
    hostId: string;
  };

  const [roomInfo, setRoomInfo] = useState<any>(null);
  const [headerMessage, setHeaderMessage] = useState('모든 인원이 입장할 때까지 기다리고 있어요');
  const [isHost, setIsHost] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchRoomInfo = async () => {
    try {
      const url = `/chatrooms/${encodeURIComponent(hostId)}`;
      const response = await axiosInstance.get(url);
      setRoomInfo(response.data);

      if (response.data.userCount + 1 === maxUserCnt + 1) {
        setHeaderMessage('게임 시작을 기다리고 있어요.');
      } else {
        setHeaderMessage('모든 인원이 입장할 때까지 기다리고 있어요.');
      }
      setIsHost(nickName === response.data.headNickname);
    } catch (error) {
      console.error('에러:', error);
    }
  };

  // 3초마다 데이터 새로고침
  useEffect(() => {
    fetchRoomInfo();

    const intervalId = setInterval(() => {
      fetchRoomInfo();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [hostId, nickName]);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/ParticipantsJoin/${hostId}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert('링크가 클립보드에 복사되었습니다!');
      })
      .catch((error) => {
        console.error('링크 복사 실패:', error);
      });
  };

  const handleStartGame = () => {
    navigate(`/ChatRoomCreate`);
  };

  const handleLeaveRoom = () => {
    setIsModalOpen(true);
  };

  const confirmLeaveRoom = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  const cancelLeaveRoom = () => {
    setIsModalOpen(false);
  };

  const isFull = roomInfo?.userCount + 1 === maxUserCnt + 1;
  const isButtonEnabled = isHost ? isFull : !isFull;

  const buttonText = isHost
    ? isFull
      ? '게임 시작하기'
      : '게임 시작하기'
    : !isFull
      ? '나가기'
      : '나가기';

  const handleButtonClick = isHost ? handleStartGame : handleLeaveRoom;

  return (
    <Container>
      <div>
        <HeaderMessage>
          <h4>{roomName}</h4>
          {headerMessage}
        </HeaderMessage>

        <ScrollArea>
          <h4 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>
              참여 인원: {roomInfo?.userCount + 1}/{maxUserCnt + 1}
            </span>
            <Button_S onClick={handleCopyLink}>
              <div className="content">
                <div className="icon">🔗</div>
                <div className="text">초대링크 복사하기</div>
              </div>
            </Button_S>
          </h4>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '10px',
              justifyContent: 'center',
            }}
          >
            {Array.from({ length: maxUserCnt + 1 }).map((_, index) => {
              const participant =
                index === 0
                  ? roomInfo?.headNickname || '빈 자리'
                  : roomInfo?.participants[index - 1] || '빈 자리';
              const isCurrentUserHost = index === 0;
              return (
                <StyledBox key={index} isHost={isCurrentUserHost}>
                  <AvatarContainer hasParticipant={index < (roomInfo?.participants.length || 0)}>
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden',
                      }}
                    ></div>
                  </AvatarContainer>
                  <StyledName>{participant}</StyledName>
                </StyledBox>
              );
            })}
          </div>
        </ScrollArea>
        <StyledButton onClick={handleButtonClick} disabled={!isButtonEnabled}>
          {buttonText}
        </StyledButton>

        {isModalOpen && (
          <Modal
            message="정말 나가시겠습니까?"
            onConfirm={confirmLeaveRoom}
            onCancel={cancelLeaveRoom}
          />
        )}
      </div>
    </Container>
  );
};

export default WaitRoomJoinForm;
