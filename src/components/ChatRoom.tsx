import React, { useEffect, useState } from 'react';

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
      </div>
      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
