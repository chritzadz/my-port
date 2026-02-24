/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

// Tailwind palette
const paleGreen = "#A8BBA3";
const offWhite = "#F7F4EA";
const pinkWhite = "#EBD9D1";
const paleBrown = "#B87C4C";

const tintColorLight = paleGreen;
const tintColorDark = offWhite;

export const Colors = {
  light: {
    text: paleBrown, // brown for text
    background: offWhite, // off-white background
    tint: paleGreen, // main accent
    icon: paleBrown,
    tabIconDefault: paleBrown,
    tabIconSelected: paleGreen,
    highlight: pinkWhite,
  },
  dark: {
    text: offWhite,
    background: paleBrown, // brown background for dark
    tint: paleGreen,
    icon: offWhite,
    tabIconDefault: offWhite,
    tabIconSelected: paleGreen,
    highlight: pinkWhite,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
