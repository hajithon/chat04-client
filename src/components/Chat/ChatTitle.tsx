import { useEffect, useState } from 'react';

import axios from 'axios';
import styled from 'styled-components';

import { ReactComponent as Left } from '@/assets/logos/leftcomma.svg';
import { ReactComponent as Right } from '@/assets/logos/rightcomma.svg';
const ChatTitle = () => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const response = await axios.get('http://15.165.157.131:8080/gpt/chat');
        setTitle(response.data);
      } catch (error) {
        console.error('');
      }
    };

    fetchTitle();
  }, []);

  return (
    <Wrapper>
      <Left />
      <Text>{title}</Text>
      <Right />
    </Wrapper>
  );
};

export default ChatTitle;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 30px;
  align-items: center;
  width: 350px;
`;

const Text = styled.div`
  width: 203px;
  height: 48px;
  padding-top: 30px;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.body11};
`;
