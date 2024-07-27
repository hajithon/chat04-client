import { Client, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WS_URL = 'http://15.165.157.131:8080/ws-chat';

interface ChatMessage {
  roomId: string;
  username: string;
  content: string;
  sendTime?: number;
}

interface UserEnterMessage {
  roomId: string;
  username: string;
}

let client: Client | null = null;
let subscription: StompSubscription | null = null;

export const connect = (
  roomId: string,
  username: string,
  onMessage: (message: ChatMessage) => void
) => {
  if (client) {
    console.warn('Already connected');
    return;
  }

  client = new Client({
    webSocketFactory: () => new SockJS(WS_URL),
    connectHeaders: {},
    debug: (str) => console.log(str),
    reconnectDelay: 5000,
    onConnect: () => {
      console.log('Connected');
      if (client) {
        subscription = client.subscribe(`/sub/chat/room/${roomId}`, (message) => {
          onMessage(JSON.parse(message.body) as ChatMessage);
        });

        const enterMessage: UserEnterMessage = {
          roomId,
          username,
        };

        client.publish({
          destination: '/pub/chat/enterUser',
          body: JSON.stringify(enterMessage),
        });
      }
    },
    onStompError: (frame) => {
      console.error('STOMP 에러:', frame);
    },
    onDisconnect: () => {
      console.log('Disconnected');
    },
  });

  client.activate();
};

export const sendMessage = (
  roomId: string,
  username: string,
  content: string,
  sendTime: number
) => {
  if (client?.connected) {
    client.publish({
      destination: '/pub/chat/sendMessage',
      body: JSON.stringify({ roomId, username, content, sendTime } as ChatMessage),
    });
  } else {
    console.error('Client error');
  }
};

export const disconnect = () => {
  if (client) {
    if (subscription) {
      subscription.unsubscribe();
    }

    if (client.connected) {
      client.publish({
        destination: '/pub/chat/sendMessage',
        body: JSON.stringify({
          roomId: '',
          username: 'SYSTEM',
          content: 'has left the chat',
        } as ChatMessage),
      });
    }

    client.deactivate();
    client = null;
    subscription = null;
  }
};
