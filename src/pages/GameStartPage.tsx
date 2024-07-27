import { useEffect, useState } from 'react';

import axios from 'axios';
import styled from 'styled-components';

import { ReactComponent as GameSubject } from '@/assets/logos/subject.svg';
export const GameStartPage = () => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const response = await axios.get('http://15.165.157.131:8080/gpt/chat');
        console.log('Title:', response.data);
        setTitle(response.data);
      } catch (error) {
        ('');
      }
    };

    fetchTitle();
  }, []);

  return (
    <div>
      <GameSubject />
      <TextContainer>
        <Text>{title}</Text>
      </TextContainer>
    </div>
  );
};

const Text = styled.div`
  width: 284px;
  height: 108px;
  padding: 12px 32px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray100};
  ${({ theme }) => theme.fonts.headline2};
`;

const TextContainer = styled.div`
  z-index: 15;
`;
