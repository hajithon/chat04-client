import styled from 'styled-components';

import { ReactComponent as GrayLogo } from '@/assets/logos/gray.svg';
interface ChatMessage {
  roomId: string;
  username: string;
  content: string;
  sendTime?: number;
}

const MessageContainer = styled.div`
  padding: 16px 20px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.gray20};
`;

const UsernameContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 4px;
`;

const UsernameImage = styled(GrayLogo)`
  width: 24px;
  height: 24px;
`;

const Username = styled.strong`
  color: ${({ theme }) => theme.colors.subpurpledeep};
  ${({ theme }) => theme.fonts.body22};
  position: relative;
  padding-bottom: 5px;
`;

const Underline = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  color: ${({ theme }) => theme.colors.subpurpledeep};
`;

const MessageContent = styled.span`
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.body22};
`;

interface ChatMessageProps {
  message: ChatMessage;
}

const ChatMessageComponent = ({ message }: ChatMessageProps) => {
  return (
    <MessageContainer>
      <UsernameContainer>
        <UsernameImage />
        <Username>{message.username}님의 구절</Username>
        <Underline />
      </UsernameContainer>
      <MessageContent>{message.content}</MessageContent>
    </MessageContainer>
  );
};

export default ChatMessageComponent;
