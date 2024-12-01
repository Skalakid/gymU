/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const primaryOrange = '#F06312';
const secondaryBlue = '#4562C9';
const error = '#FF0000';
const lightGreen = '#b8e082';
const lightYellow = '#feda5d';
const lightRed = '#ff9176';

export const ChartPrimaryColor = (opacity = 1) =>
  `rgba(240, 99, 18, ${opacity})`;

export const Colors = {
  light: {
    primary: primaryOrange,
    secondary: secondaryBlue,
    background: '#FFFFFF',
    tile: '#A9A9A9',
    subTile: '#434343',
    text: '#11181C',
    description: '#BCBCBC',
    icon: '#11181C',
    error,
    lightGreen,
    lightYellow,
    lightRed,
  },
  dark: {
    primary: primaryOrange,
    secondary: secondaryBlue,
    background: '#141313',
    tile: '#2B2B2B',
    subTile: '#D9D9D9',
    text: '#FFFFFF',
    description: '#BCBCBC',
    icon: '#A8A8A8',
    error,
    lightGreen,
    lightYellow,
    lightRed,
  },
  white: '#FFFFFF',
};
