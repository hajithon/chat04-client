import styled from 'styled-components';

import { ReactComponent as Gray } from '@/assets/logos/logo.svg'; // SVG 로고 임포트

const PropertyDefault = styled.div`
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

const Logo = styled(Gray)`
  width: auto;
`;

const TopNav = () => {
  return (
    <PropertyDefault>
      <Logo />
    </PropertyDefault>
  );
};

export default TopNav;
