import React from 'react';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import GlobalFont from '@/styles/GlobalFont';
import GlobalStyle from '@/styles/GlobalStyle';
import { theme } from '@/styles/theme';

import { Router } from './routers/router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Router />
        <GlobalFont />
        <GlobalStyle />
      </BrowserRouter>
    </ThemeProvider>
  </RecoilRoot>
);
