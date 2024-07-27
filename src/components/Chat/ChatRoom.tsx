import React, { useEffect, useState, useRef } from 'react';

import styled from 'styled-components';

import { connect, disconnect, sendMessage } from '@/api/WebSocketService';
import { ReactComponent as TypingLogo } from '@/assets/logos/typing.svg';
import ChatMessageComponent from '@/components/Chat/ChatMessage';

interface ChatMessage {
  roomId: string;
  username: string;
  content: string;
  sendTime?: number;
}

interface ChatRoomProps {
  roomId: string;
  username: string;
}

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 16px;
  background: ${({ theme }) => theme.colors.gray80};
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;

  background: ${({ theme }) => theme.colors.gray80};
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 16px 18px 49px 18px;
  background: ${({ theme }) => theme.colors.gray20};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray10};
  ${({ theme }) => theme.fonts.body21};
  border-radius: 4px;
  outline: none;
`;

const SendButton = styled.button`
  padding: 8px 16px;
  border: none;

  color: ${({ theme }) => theme.colors.main};
  ${({ theme }) => theme.fonts.body21};
  border-radius: 4px;
  cursor: pointer;
`;

const TypingIndicatorContainer = styled.div`
  position: relative;
  width: 335px;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 11;
`;

const TypingLogoStyled = styled(TypingLogo)`
  width: 100%;
  height: 100%;

  top: 0;
  left: 0;
`;

const TypingText = styled.div`
  position: absolute;
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: bold;
  z-index: 12;
  text-align: center;
`;

const ChatRoom = ({ roomId, username }: ChatRoomProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const typingTimeoutRef = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    connect(roomId, username, (message: ChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      disconnect();
    };
  }, [roomId, username]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (messageInput.trim() === '') return;

    const sendTime = Date.now();
    sendMessage(roomId, username, messageInput, sendTime);
    setMessageInput('');
    handleTypingEnd(username);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);

    if (!typingUsers.has(username)) {
      setTypingUsers((prev) => new Set(prev).add(username));
    }

    if (typingTimeoutRef.current[username]) {
      clearTimeout(typingTimeoutRef.current[username]);
    }

    typingTimeoutRef.current[username] = setTimeout(() => {
      handleTypingEnd(username);
    }, 2000);
  };

  const handleTypingEnd = (username: string) => {
    setTypingUsers((prev) => {
      const newSet = new Set(prev);
      newSet.delete(username);
      return newSet;
    });
  };

  return (
    <ChatContainer>
      <ChatMessages>
        {messages.map((msg, index) => (
          <ChatMessageComponent key={index} message={msg} />
        ))}
        {Array.from(typingUsers).map((user, index) => (
          <TypingIndicatorContainer key={`typing-${index}`}>
            <TypingLogoStyled />
            <TypingText>{user}님이 입력 중입니다..</TypingText>
          </TypingIndicatorContainer>
        ))}
        <div ref={messagesEndRef} />
      </ChatMessages>
      <InputContainer>
        <Input
          type="text"
          value={messageInput}
          onChange={handleInputChange}
          placeholder="소설을 이어서 작성해보세요"
          onBlur={() => handleTypingEnd(username)}
        />
        <SendButton onClick={handleSendMessage} disabled={messageInput.trim() === ''}>
          전송
        </SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatRoom;
