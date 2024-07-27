import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { currentNickname } from '@/recoil/nickname';

const ParticipantsForm = () => {
  const { roomId: paramRoomId } = useParams();
  const [nickname, setNickname] = useRecoilState(currentNickname);
  const [roomId, setRoomId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (paramRoomId) {
      setRoomId(paramRoomId);
    }
  }, [paramRoomId]);
  const handleCreateRoom = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      navigate(`/${roomId}`);
    } catch (error) {
      setError('채팅방 입장에 실패했습니다.');
    }
  };

  return (
    <div>
      <h1>방장이 공유한 채팅방으로 가기</h1>
      <form onSubmit={handleCreateRoom}>
        <div>
          <label>닉네임:</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </div>
        <div>
          <label>참여 코드 입력:</label>
          <input type="text" value={roomId} onChange={(e) => setRoomId(e.target.value)} required />
        </div>
        <button type="submit">채팅방 입장하기</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ParticipantsForm;
