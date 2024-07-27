import React, { useEffect, useState, useRef } from 'react';

import { connect, disconnect, sendMessage } from '@/api/WebSocketService';

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

const ChatRoom = ({ roomId, username }: ChatRoomProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const typingTimeoutRef = useRef<{ [key: string]: NodeJS.Timeout }>({});

  useEffect(() => {
    connect(roomId, username, (message: ChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      disconnect();
    };
  }, [roomId, username]);

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
    <div>
      <h2>Chat Room: {roomId}</h2>
      <div id="chat-messages" style={{ height: '300px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.username}</strong>: {msg.content}
          </div>
        ))}
        {Array.from(typingUsers).map((user, index) => (
          <div key={`typing-${index}`} style={{ fontStyle: 'italic' }}>
            {user}님이 입력 중입니다..
          </div>
        ))}
      </div>
      <input
        type="text"
        value={messageInput}
        onChange={handleInputChange}
        placeholder="Type a message   "
        onBlur={() => handleTypingEnd(username)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
