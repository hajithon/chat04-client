import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { createRoom } from '@/api/create';
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
    <div>
      <h1>채팅방 생성</h1>
      <form onSubmit={handleCreateRoom}>
        <div>
          <label>채팅방 이름:</label>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>닉네임:</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </div>
        <div>
          <label>최대 사용자 수:</label>
          <input
            type="number"
            value={maxUserCnt}
            onChange={(e) => setMaxUserCnt(Number(e.target.value))}
            min="1"
            required
          />
        </div>
        <button type="submit">채팅방 생성</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ChatRoomCreate;
