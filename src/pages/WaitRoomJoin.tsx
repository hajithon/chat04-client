import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WaitRoomJoinForm from '@/components/WaitRoomJoin/WaitRoomJoinForm';
import styled from 'styled-components';

export const WaitRoomJoin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentUserCount, setCurrentUserCount] = useState(1); // 현재 인원(초기값 한 명) 카운트

  const roomName = location.state?.roomName || '방 이름 없음';
  const maxUserCnt = location.state?.maxUserCnt || 2;
  const hostId = location.state?.hostId || 'hostId 없음';

  return <WaitRoomJoinForm />;
};
