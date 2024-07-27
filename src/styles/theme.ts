import { DefaultTheme } from 'styled-components';

const colors = {
  main: '#546AEF',

  subyellow: '#FCE572',
  subblue: '#66E2F1',
  subpink: '#FF729E',
  subpurpledeep: '#4C5FD7',
  subpurplepale: '#EEF1FE',

  gray100: '#181A1B',
  gray90: '#2C2D30',
  gray80: '#3C3E41',
  gray70: '#515356',
  gray60: '#6B7276',
  gray50: '#888E94',
  gray40: '#A3A8AE',
  gray30: '#BFC2C8',
  gray20: '#DDE1E8',
  gray10: '#EDF1F5',
  gray5: '#FAFAFB',

  white: '#FFFFFF',
  black: '#000000',
} as const;

interface Font {
  font: string;
  weight: number;
  size: number;
  lineHeight: number;
}

const FONT = ({ font, weight, size, lineHeight }: Font): string => {
  return `
    font-family : "${font}";
    font-weight : ${weight};
    font-size : ${size}px;
    line-height : ${lineHeight}%;
    `;
};

const fonts = {
  headline1: FONT({
    font: 'NanumSquare',
    weight: 800,
    size: 32,
    lineHeight: 48,
  }),
  headline2: FONT({
    font: 'NanumSquare',
    weight: 800,
    size: 28,
    lineHeight: 42,
  }),
  headline3: FONT({
    font: 'NanumSquare',
    weight: 800,
    size: 24,
    lineHeight: 36,
  }),
  headline4: FONT({
    font: 'NanumSquare',
    weight: 800,
    size: 20,
    lineHeight: 30,
  }),
  subhead11: FONT({
    font: 'SUIT',
    weight: 700,
    size: 18,
    lineHeight: 27,
  }),

  subhead12: FONT({
    font: 'SUIT',
    weight: 500,
    size: 18,
    lineHeight: 27,
  }),
  body11: FONT({
    font: 'SUIT',
    weight: 700,
    size: 16,
    lineHeight: 24,
  }),
  body12: FONT({
    font: 'SUIT',
    weight: 500,
    size: 16,
    lineHeight: 24,
  }),

  body21: FONT({
    font: 'SUIT',
    weight: 700,
    size: 14,
    lineHeight: 21,
  }),
  body22: FONT({
    font: 'SUIT',
    weight: 500,
    size: 14,
    lineHeight: 21,
  }),

  caption11: FONT({
    font: 'SUIT',
    weight: 700,
    size: 12,
    lineHeight: 18,
  }),

  caption12: FONT({
    font: 'SUIT',
    weight: 500,
    size: 12,
    lineHeight: 18,
  }),
};

export type ColorsTypes = typeof colors;
export type FontsTypes = typeof fonts;

export const theme: DefaultTheme = {
  colors,
  fonts,
};
