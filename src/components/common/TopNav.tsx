import React from 'react';

import styled from 'styled-components';

const Property1Default = styled.div`
  width: 100%;
  height: 48px;
  padding: 7px 285px 7px 18px;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`;

const Logo = styled.div`
  color: #546aef;
  font-size: 24px;
  font-weight: 700;
  line-height: 33.6px;
`;

const TopNav: React.FC = () => {
  return (
    <Property1Default>
      <Logo>LOGO</Logo>
    </Property1Default>
  );
};

export default TopNav;
