/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const primaryOrange = '#F06312';
const secondaryBlue = '#4562C9';
const error = '#FF0000';

export const Colors = {
  light: {
    primary: primaryOrange,
    secondary: secondaryBlue,
    background: '#FFFFFF',
    text: '#11181C',
    description: '#BCBCBC',
    icon: '#11181C',
    error,
  },
  dark: {
    primary: primaryOrange,
    secondary: secondaryBlue,
    background: '#141313',
    text: '#FFFFFF',
    description: '#BCBCBC',
    icon: '#A8A8A8',
    error,
  },
  white: '#FFFFFF',
};
